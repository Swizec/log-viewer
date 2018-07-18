import React from "react";
import Downshift from "downshift";
import matchSorter from "match-sorter";

class LogViewer extends React.Component {
    static getDerivedStateFromProps(props, state) {
        return {
            ...state,
            logs: props.logs.split("\n")
        };
    }

    render() {
        const { logs } = this.state;

        return (
            <Downshift>
                {({ getInputProps, inputValue }) => {
                    const filtered =
                        (!inputValue && logs) || matchSorter(logs, inputValue);

                    return (
                        <div>
                            <input
                                {...getInputProps()}
                                placeholder="Filter logs ..."
                            />
                            <p>{filtered.length} matches</p>
                            <pre>{filtered.join("\n")}</pre>
                        </div>
                    );
                }}
            </Downshift>
        );
    }
}

export default LogViewer;
