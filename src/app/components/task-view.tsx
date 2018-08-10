import * as React from "react";

import { Task } from "../contracts/Task";

import "./tasks.css";
import { ActionsCreators } from "../actions/action-creators";

export type TaskClicked = (index: number, done: boolean) => void;
export type DeleteClicked = (index: number) => void;

interface Props {
    Click: TaskClicked;
    clickDelete: DeleteClicked;
    singletask: Task;
}

export class TaskView extends React.Component<Props> {

    protected onClickAction: React.MouseEventHandler<HTMLDivElement> = event => {
        this.props.Click(this.props.singletask.index, !this.props.singletask.done);
        ActionsCreators.refreshDatabaseCall();
    }

    protected onClickDelete: React.MouseEventHandler<HTMLDivElement> = event => {
        this.props.clickDelete(this.props.singletask.index);
        ActionsCreators.refreshDatabaseCall();
    }

    public render(): JSX.Element {
        return (
            <div className="task" >
                <div className="task-text" onClick={this.onClickAction}
                style={{textDecoration: this.props.singletask.done ? "line-through" :
                "none"}}>
                {this.props.singletask.taskName} </div>
                <div className="task-button">
                <div className="button"><img src="https://www.freeiconspng.com/uploads/black-x-png-27.png"
                onClick={() => this.props.clickDelete(this.props.singletask.index)}/></div>
                </div>
            </div>
        );

    }
}
