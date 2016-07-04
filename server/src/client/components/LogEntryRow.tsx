import * as React from "react";
import * as ReactDOM from "react-dom";
import { Input, Button, Tabs, Tab, Alert, ButtonToolbar, Well, Panel } from 'react-bootstrap';
import * as moment from "moment";
import { ILogEntry } from "extension-services";
import * as classnames from "classnames";

interface LogEntryRowProps extends React.Props<any> {
    entry: ILogEntry;
    index: number;
    isHighlighted?: boolean;
}

interface LogEntryRowState extends React.Props<any> {
    message?: string;
    truncatedMessage?: string;
    truncatedParams?: string;
    isExpanded?: boolean;
    serializedParams?: string;
}

export class LogEntryRow extends React.Component<LogEntryRowProps, LogEntryRowState> {

    constructor(props: LogEntryRowProps, context) {
        super(props, context);
        const {entry} = props;
        var message = (entry.params && entry.params.length > 0) ? entry.params[0] + "" : "";
        var args = entry.params.slice(1);
        var serializedParams = args.map(a => JSON.stringify(a)).filter(s => s.length > 0).join(", ");
        this.state = {
            message,
            serializedParams,
            truncatedMessage: this.truncate(message, 80),
            truncatedParams: this.truncate(serializedParams, 80)
        };
    }

    private truncate(str: string, maxLen: number): string {
        if (str.length < maxLen - 2)
            return str;
        if (str.length < maxLen)
            return str;

        return str.substr(0, maxLen - 2) + "..";
    }

    private openDOMSnapshot() {
        var newWindow = window.open();
        newWindow.document.write("<html><body>" + this.props.entry.params[1] + "</body></html>");
    }

    private isDOMSnapshot(): boolean {
        return this.props.entry.params.length > 0 && this.props.entry.params[0] == "DOMSnapshot";
    }

    private getTime(): string {
        return moment(parseInt(this.props.entry.time)).format("hh:mm:ss.SSS");
    }

    highlight() {
        //  if (!this.props.isHighlighted)
        //     Routes.gotoLog(this.props.log.id, this.props.index);         
    }

    expand() {
        this.setState({ isExpanded: !this.state.isExpanded });
    }

    render() {
        const { index, entry, isHighlighted } = this.props;
        var { truncatedMessage, truncatedParams, isExpanded } = this.state;
        return <tr key={index}
            className={classnames("entry", isHighlighted ? "highlighted" : null, entry.level + "-level") }>

            <td className="entry-index" onClick={() => this.highlight() }>
                {index}
            </td>

            <td className="entry-timestamp" onClick={() => this.expand() }>
                {this.getTime() }
            </td>
            <td className="entry-level" onClick={() => this.expand() }>
                {entry.level}
            </td>

            { isExpanded ? this.renderExpanded() : this.renderUnexpanded() }

        </tr>;
    }

    renderExpanded() {
         var { index, entry, isHighlighted } = this.props; 
         var { truncatedMessage, truncatedParams, isExpanded, message } = this.state;
         var params = JSON.stringify(entry.params.slice(1), null, 4);

         return <td className="entry-message" onClick={() => this.expand()}>
                <div>{message}</div>
                <div style={{position: "relative"}} onClick={e => e.stopPropagation()}>
                    <pre style={{cursor: "text"}}>
                        {params}
                    </pre>                      
                </div>                      
        </td>;
    }

    renderUnexpanded() {
        var { index, entry, isHighlighted } = this.props;
        var { truncatedMessage, truncatedParams, isExpanded, message } = this.state;
        var classes = classnames("entry-message", truncatedMessage != message ? "truncated" : null);

        return <td className={classes} onClick={() => this.expand() }>
            <div style={{ position: "relative" }}>
                {truncatedMessage} { truncatedParams != '[]' ? <span className="entry-params">{truncatedParams}</span> : null }
            </div>
        </td>;
    }
}