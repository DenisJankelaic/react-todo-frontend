import { Dispatcher } from "simplr-flux";

import {
    Change,
    FilterDone,
    FilterUndone,
    RefreshList,
    RefreshDatabaseAction
} from "./actions";
import { Task } from "../contracts/Task";

export namespace ActionsCreators {

    export async function clickPressed(index: number, done: boolean): Promise<void> {
        let doneParam;
        if (done) {
            doneParam = "true";
        } else {
            doneParam = "false";
        }
        const request = new XMLHttpRequest();
        request.open("PUT", `http://localhost:3001/task/update?index=${index}&done=${doneParam}`, true);
        request.setRequestHeader("Content-type", "application/json;  charset=UTF-8");
        request.send();
        await fetch(`http://localhost:3001/tasks`);
        refreshDatabaseCall();
    }

    export function changePressed(event: string): void {
        Dispatcher.dispatch(new Change(event));
    }
    export async function submitPressed(event: string): Promise<void> {
        const newTask: Task = {
            index: Number(new Date().getTime()),
            taskName: event.charAt(0).toUpperCase() + event.slice(1),
            done: false
        };
        try {
            const request = new XMLHttpRequest();
            request.open("POST", "http://localhost:3001/task", true);
            request.setRequestHeader("Content-type", "application/json;  charset=UTF-8");
            await request.send(JSON.stringify(newTask));
            await fetch(`http://localhost:3001/tasks`);
        } catch (error) {
            console.info(error);
        }
    }
    export async function refreshDatabaseCall(): Promise<void> {
        const todocall = await fetch(`http://localhost:3001/tasks`);
        if (todocall.status === 200) {
            const data: Task[] = await todocall.json();
            Dispatcher.dispatch(new RefreshDatabaseAction(data));
        } else {
            console.info("rip");
        }
    }
    export async function clickDeletePressed(index: number): Promise<void> {
        const request = new XMLHttpRequest();
        request.open("DELETE", `http://localhost:3001/task/${index}`, true);
        request.setRequestHeader("Content-type", "application/json;  charset=UTF-8");
        request.send();
        await fetch(`http://localhost:3001/tasks`);
        refreshDatabaseCall();
    }
    export async function clearListPressed(): Promise<void> {
        if (confirm("Are you sure you want to clear your to do list?")) {
            const request = new XMLHttpRequest();
            request.open("DELETE", "http://localhost:3001/tasks", true);
            request.setRequestHeader("Content-type", "application/json;  charset=UTF-8");
            request.send();
            await fetch(`http://localhost:3001/tasks`);
            refreshDatabaseCall();
        }
    }

    export function filterDonePressed(): void {
        Dispatcher.dispatch(new FilterDone);
    }

    export function filterUndonePressed(): void {
        Dispatcher.dispatch(new FilterUndone());
    }

    export function refreshListPressed(): void {
        Dispatcher.dispatch(new RefreshList());
    }
}
