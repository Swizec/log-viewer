import React, { Component } from "react";
import { render } from "react-dom";

import LogViewer from "../../src";

class Demo extends Component {
    state = {
        logs: null
    };

    componentDidMount() {
        fetch(
            "https://gist.githubusercontent.com/Swizec/100cf58948c84e7454ad9c9dbe9e1d37/raw/1afa950006f87ce69c98759deb72b337727acd22/gistfile1.txt"
        )
            .then(response => response.text())
            .then(logs => this.setState({ logs }));
    }

    render() {
        const { logs } = this.state;

        return (
            <div>
                <h1>log-viewer Demo</h1>
                {logs ? <LogViewer logs={logs} /> : "Loading ..."}
            </div>
        );
    }
}

render(<Demo />, document.querySelector("#demo"));
