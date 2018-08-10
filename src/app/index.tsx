import * as React from "react";
import * as ReactDOM from "react-dom";

import { InputView } from "./components/input-view";
import { TasksContainer } from "./containers/tasks-container";
import "./styles/index.css";

class App extends React.Component {
    public render(): JSX.Element {
        return (
            <div className="view">
            <div className="title">
                To do list
                </div>
                <div>
                    <InputView />
                </div>
                <div>
                <TasksContainer />
                </div>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("app-root"));
