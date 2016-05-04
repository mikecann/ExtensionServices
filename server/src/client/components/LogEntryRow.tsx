import * as React from "react";
import * as ReactDOM from "react-dom";
import { Input, Button, Tabs, Tab, Alert, ButtonToolbar, Well, Panel } from 'react-bootstrap';
import * as moment from "moment";
import { ILogEntry } from "extension-services";

interface LogEntryRowProps extends React.Props<any> {
    entry: ILogEntry;
}

interface LogEntryRowState extends React.Props<any> {
    expanded?: boolean;
    headerItems?: string;
}

export class LogEntryRow extends React.Component<LogEntryRowProps, LogEntryRowState> {
    
    maxHeaderLength = 150;

    constructor(props: LogEntryRowProps, context) {
        super(props, context);
        this.state = { expanded: false };
    }

    componentDidMount() {

        var jsonParams = this.getParamsStr(this.props.entry.params);
        var header = this.props.entry.level;

        if (jsonParams.length > 150)
            header += " " + jsonParams.substr(0, 147) + "...";
        else
            header += " " + jsonParams;

        this.setState({
            expanded: false
        });   
    }    

    private getParamsStr(params: any[]): string {
        return params.map(p => JSON.stringify(p)).join(' ');
    }

    private renderHeaderLevel() {
        return <span>{this.props.entry.level}</span>;
    }

    private renderHeaderParams() {

        var length = 0;
        var count = 0;
        return this.props.entry.params.map(p => {    

            if (length >= this.maxHeaderLength - 3)
                return "";

            var type = typeof p;
            var str = JSON.stringify(p);
            if (length + str.length > this.maxHeaderLength - 3)
                str = str.substr(0, this.maxHeaderLength - length - 3) + "...";

            length += str.length;
                       
            return <span key={count++} className={"param-type-" + type}>{str}</span>;
        });
    }

    toggleExpand() {
        this.setState({
            expanded: !this.state.expanded
        });
    }

    private openDOMSnapshot() {
        var newWindow = window.open();
        newWindow.document.write("<html><body>" + this.props.entry.params[1] + "</body></html>");
    }

    private isDOMSnapshot(): boolean {
        return this.props.entry.params.length > 0 && this.props.entry.params[0] == "DOMSnapshot";
    }

    private renderContents() {

        if (this.isDOMSnapshot())
            return <a href="#" onClick={ this.openDOMSnapshot.bind(this) } >View DOM Snapshot</a>

        return <pre>{JSON.stringify(this.props.entry, null, 4) }</pre>;
    }

    private getTime(): string {
        return moment(parseInt(this.props.entry.time)).format("hh:mm:ss.SSS");
    }
    
    render() {

        return <div className="log-entry-row">
            <button className="btn btn-default" onClick={ this.toggleExpand.bind(this) }>
                <span className={"entry-level-indicator entry-level-" + this.props.entry.level.toLowerCase()}></span>
                <span>{this.getTime()}</span>{this.renderHeaderParams()}
            </button>
            <Panel collapsible expanded={this.state.expanded}>
                { this.state.expanded ? this.renderContents() : ""}
            </Panel>
        </div>
    }
}