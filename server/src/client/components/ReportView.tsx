import * as React from "react";
import * as ReactDOM from "react-dom";
import { Input, Button, Tabs, Tab, Alert, ButtonToolbar, Well, Panel } from 'react-bootstrap';
import * as moment from "moment";
import { LogEntryRow } from "./LogEntryRow";

interface ReportViewProps extends React.Props<any> {
    report: IErrorReport;
}

interface ReportViewState extends React.Props<any> {
    activeLog?: ILog;
}

export class ReportView extends React.Component<ReportViewProps, ReportViewState> {
    
    constructor(props: ReportViewProps, context) {
        super(props, context);
        this.state = { };
    }

    componentDidMount() {
        //console.log("showing reports for logs", this.props.report.logs);
        //this.setState({ activeLog: (this.props.report.logs as ILog[])[0] });
    }        

    private renderLogs() {
        var count = 0;
        return (this.props.report.logs as ILog[]).map(l => {
            return this.renderLogButton(l, count++);
        });
    }

    private renderLogButton(l: ILog, index:number) {
        return <button className="btn btn-default" key={index}
            onClick={ () => { this.setState({ activeLog: l }) } }>
                {moment(parseInt(l.date)).format("DD/MM/YYYY hh:mm") + " - " + l.log.length}
            </button>;
    }

    private renderReportRows() {
        if (this.state.activeLog == null)
            return null;

        var count = 0;
        return this.state.activeLog.log.map(e => <LogEntryRow entry={e} key={e.time + " - " + count++} />);
    }

    render() {

        return <div>
            <Panel header="Report Details" className="report-details">
                <Input type="text" readOnly={true} value={this.props.report.version}
                    label="Version" />
                <Input type="email" readOnly={true} value={this.props.report.email}
                    label="Email" />
                <Input type="textarea" readOnly={true} value={this.props.report.comments}
                    label="Comments" />
            </Panel>
            <Panel header="Logs" className="logs-list">
                {this.renderLogs()}
            </Panel>
            <div className="entry-rows">
                {this.renderReportRows() }
            </div>
         </div>;
    }
}