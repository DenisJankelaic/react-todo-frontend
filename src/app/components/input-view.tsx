import * as React from "react";

import { ActionsCreators } from "../actions/action-creators";

import "../styles/input-view.css";

interface State {
    inputValue: string;
}

export class InputView extends React.Component<{}, State> {
    public state: State = {
        inputValue: ""
    };
    public componentWillMount(): void {
        ActionsCreators.refreshDatabaseCall();
    }
    protected Change: React.ChangeEventHandler<HTMLInputElement> = event => {
        this.setState({
            inputValue: event.target.value
        });
    };

    protected Submit: React.KeyboardEventHandler<HTMLInputElement> = event => {
        if (event.key === "Enter") {
            this.submitTask(this.state.inputValue);
            this.resetInput();
        }
    };

    protected async submitTask(taskname: string): Promise<void> {
        if (taskname.length === 0) {
            alert("Ye gotta write somethin' there, mate");
        } else {
            await ActionsCreators.submitPressed(taskname);
            ActionsCreators.refreshDatabaseCall();
        }
    }

    protected resetInput(): void {
        this.setState({
            inputValue: ""
        });
    }

    public render(): JSX.Element {
        return (
            <div>
                <div>
                    <input
                        onChange={this.Change}
                        onKeyPress={this.Submit}
                        placeholder="What are you doing?"
                        value={this.state.inputValue}
                    />
                </div>
            </div>);
    }
}
