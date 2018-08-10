import { ReduceStore, ActionHandler } from "simplr-flux";

import {
    ClickAction,
    ClickDelete, Submit,
    ClearList, RefreshList,
    FilterDone, FilterUndone, RefreshDatabaseAction
} from "../actions/actions";

import { Task } from "./../contracts/Task";

interface StoreState {
    tasks: Task[];
    backuparray: Task[];
}

class TasksReduceStoreClass extends ReduceStore<StoreState> {
    public getInitialState(): StoreState {
        return {
            tasks: [],
            backuparray: []
        };
    }
    constructor() {
        super();
        this.registerAction(ClickAction, this.onClickAction);
        this.registerAction(ClickDelete, this.onClickDelete);
        this.registerAction(Submit, this.onSubmit);
        this.registerAction(FilterDone, this.onFilterDone);
        this.registerAction(FilterUndone, this.onFilterUndone);
        this.registerAction(RefreshList, this.onRefreshList);
        this.registerAction(RefreshDatabaseAction, this.onRefreshDatabaseAction);
    }

    private onRefreshDatabaseAction: ActionHandler<RefreshDatabaseAction, StoreState> = (action, state) => {
        const nextState: StoreState = {
            tasks: action.TaskList,
            backuparray: action.TaskList
        };
        return nextState;
    }

    private onSubmit: ActionHandler<Submit, StoreState> = (action, state) => {
        const nextState: StoreState = {
            ...state,
            tasks: action.TaskList
        };
        return nextState;
    };

    private onClickAction: ActionHandler<ClickAction, StoreState> = (action, state) => {
        const nextState: StoreState = {
            ...state
        };
        for (let i = 0; i < nextState.tasks.length; i++) {
            if (nextState.tasks[i].index === action.Index) {
                nextState.tasks[i].done = !nextState.tasks[i].done;
            }
        }
        return {
            ...state,
            tasks: [...nextState.tasks]
        };
    }
    private onClickDelete: ActionHandler<ClickDelete, StoreState> = (action, state) => {
        const nextState: StoreState = {
            ...state
        };
        for (let i = 0; i < nextState.tasks.length; i++) {
            if (nextState.tasks[i].index === action.Index) {
                nextState.tasks.splice(i, 1);
            }
        }
        return {
            ...state,
            tasks: [...nextState.tasks],
            backuparray: [...nextState.tasks]
        };
    }

    private onFilterDone: ActionHandler<FilterDone, StoreState> = (action, state) => {
        const nextState: StoreState = {
            ...state
        };
        return {
            ...state,
            tasks: [...nextState.backuparray.filter(x => (x.done === true))]
        };
    }
    private onFilterUndone: ActionHandler<FilterUndone, StoreState> = (action, state) => {
        const nextState: StoreState = {
            ...state
        };
        return {
            ...state,
            tasks: [...nextState.backuparray.filter(x => (x.done !== true))]
        };
    }
    private onRefreshList: ActionHandler<RefreshList, StoreState> = (action, state) => {
        const nextState: StoreState = {
            ...state
        };
        return {
            ...state,
            tasks: [...nextState.backuparray]
        };
    }

    public get Tasks(): Task[] {
        return this.getState().tasks;
    }

}
export const TasksReduceStore = new TasksReduceStoreClass();
