import React from "react";
import Downshift from "downshift";
import matchSorter from "match-sorter";
import styled from "styled-components";

const Highlight = styled.span`
    color: red;
    background: yellow;
`;

const LogRow = ({ match, children }) => {
    const _match = match.toLowerCase();

    const chunks = match.length
        ? children.split(new RegExp("(" + match + ")", "ig"))
        : [children];

    return (
        <div>
            {chunks.map(
                chunk =>
                    chunk.toLowerCase() === _match ? (
                        <Highlight>{chunk}</Highlight>
                    ) : (
                        chunk
                    )
            )}
        </div>
    );
};

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
                            <pre>
                                {filtered.map(log => (
                                    <LogRow match={inputValue}>{log}</LogRow>
                                ))}
                            </pre>
                        </div>
                    );
                }}
            </Downshift>
        );
    }
}

export default LogViewer;
