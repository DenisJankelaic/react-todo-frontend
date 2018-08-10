import * as React from "react";
import { Container } from "flux/utils";

import { Task } from "../contracts/Task";
import { TasksReduceStore } from "../stores/tasks-reducestore";
import { ActionsCreators } from "../actions/action-creators";
import {
    TaskView, TaskClicked, DeleteClicked
} from "../components/task-view";
import "../styles/button-view.css";
interface State {
    tasks: Task[];
}

class TasksContainerClass extends React.Component<{}, State> {
    public static getStores(): Container.StoresList {
        return [TasksReduceStore];
    }

    public static calculateState(state: State): State {
        return {
            tasks: TasksReduceStore.getState().tasks
        };
    }

    protected onDeleteClick: DeleteClicked = index => {
        ActionsCreators.clickDeletePressed(index);
    };

    protected onTaskClick: TaskClicked = (index, done) => {
        ActionsCreators.clickPressed(index, done);
    };
    protected onClearList = () => {
        ActionsCreators.clearListPressed();
    }
    protected onFilterDone = () => {
        ActionsCreators.filterDonePressed();
    }
    protected onFilterUndone = () => {
        ActionsCreators.filterUndonePressed();
    }
    protected onRefreshList = () => {
        ActionsCreators.refreshListPressed();
    }

    public render(): JSX.Element {
        return (
            <div>
                <div className="main-buttons">
                    <div className="button">
                        <div className="button">
                        <img src="https://image.freepik.com/free-icon/trash-bin-doodle-outline_318-34506.jpg"
                            alt="TrashCan" onClick={this.onClearList} /></div>
                        <div className="button">
                        <img src="https://img.freepik.com/free-icon/check-mark-doodle_318-34713.jpg?size=338&ext=jpg"
                            alt="CheckMark" onClick={this.onFilterDone} /></div>
                        <div className="button">
                        <img src="http://cdn.onlinewebfonts.com/svg/img_173665.png"
                            alt="Circle" onClick={this.onFilterUndone} /></div>
                        <div className="button">
                        <img src="https://cdn4.iconfinder.com/data/icons/wirecons-free-vector-icons/32/refresh-512.png"
                            alt="Back" onClick={this.onRefreshList} /></div>
                    </div>
                </div>
                <div className="list">
                    {this.state.tasks.map((singletask, i) =>
                        (
                            <TaskView
                                key={i}
                                Click={this.onTaskClick}
                                clickDelete={this.onDeleteClick}
                                singletask={singletask}
                            />
                        ))}
                </div>
            </div>
        );
    }
}

export const TasksContainer = Container.create(TasksContainerClass);
