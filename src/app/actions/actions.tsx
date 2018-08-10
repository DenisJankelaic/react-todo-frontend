import { Task } from "../contracts/Task";

export class ClickAction {
    constructor(private index: number) { }
    public get Index(): number {
        return this.index;
    }
}
export class Change {
    constructor(private event: string) { }
    public get Event(): string {
        return this.event;
    }
}
export class Submit {
    constructor(private tasklist: Task[]) { }
    public get TaskList(): Task[] {
        return this.tasklist;
    }
}
export class ClickDelete {
    constructor(private index: number) { }
    public get Index(): number {
        return this.index;
    }
}
export class RefreshDatabaseAction {
    constructor(private tasklist: Task[]) { }
    public get TaskList(): Task[] {
        return this.tasklist;
    }
}
export class ClearList {
}
export class FilterDone {
}
export class FilterUndone {
}
export class RefreshList {
}
