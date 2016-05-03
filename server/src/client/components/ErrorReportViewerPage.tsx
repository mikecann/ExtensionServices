import * as React from "react";
import * as ReactDOM from "react-dom";
import { Input, Button, Tabs, Tab, Alert, ButtonToolbar, Well } from 'react-bootstrap';
import * as $ from "jquery";
import * as auth from "../services/AuthService";
import * as axios from "axios";
import * as lzjs from "lzjs";
import { Loading } from "./Loading";
import { ReportView } from "./ReportView";

interface Props extends React.Props<any> {
    params: { id:string };
}

interface State extends React.Props<any> {
    isLoading?: boolean;
    report?: IErrorReport;
}

export class ErrorReportViewerPage extends React.Component<Props, State> {

    constructor(props: Props, context) {
        super(props, context);
        this.state = {
            isLoading: true
        };
    }    
    
    async componentDidMount() {
        if (this.props.params==null || this.props.params.id==null)
            return;
                
        this.setState({ isLoading:true });
        var response = await axios.get<IErrorReport>("/api/errorReport", { params: { id: this.props.params.id } })
        var report = response.data;
        report.logs = JSON.parse(lzjs.decompress(report.logs));
        
        console.log("got report", report);
        this.setState({isLoading:false, report});
    }
    
    render() {      
        
        if (this.props.params==null || this.props.params.id==null)
            return <div>No report specified</div>;
        else        
            return <div>
                <h1>Error Report Viewer</h1>
                <h4>For route: {this.props.params.id}</h4>
                <div>
                    { this.state.isLoading ? <Loading /> : <ReportView report={this.state.report} /> }
                </div>
            </div>;
    }
}