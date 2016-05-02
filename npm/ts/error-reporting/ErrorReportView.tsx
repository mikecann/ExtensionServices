import * as React from "react";
import * as ReactDOM from "react-dom";
import * as marked from "marked";
import { ILog } from "../logging/Logging";
import { Button, Input, Alert } from "react-bootstrap";

export interface ErrorReportViewProps extends React.Props<any> {
    userEmail?:string;    
    logs?: ILog[];
}

export interface ErrorReportViewState extends React.Props<any> {
    logStr?: string;
    comments?: string;
    saving?: boolean;
    sent?: boolean;
    error?: string;
    filesize?: string;
    email?: string;
}


export class ErrorReportView extends React.Component<ErrorReportViewProps, ErrorReportViewState> {
    
    constructor(props: ErrorReportViewProps, context: any) {
        super(props, context);
        this.state = { 
            email: props.userEmail
        };
    }
    
    reportError() {
        this.setState({ saving: true, error: null });          
    }    
    
    componentWillReceiveProps(nextProps:ErrorReportViewProps)
    {
        if (nextProps.userEmail != this.props.userEmail)
            this.setState({ email: nextProps.userEmail });
        
        if (nextProps.logs != this.props.logs)
            this.setState({ logStr: JSON.stringify(nextProps.logs) })
    }
    
    private validationState() {
        return this.isEmailValid(this.state.email) ? 'success' : 'error';
    }

    private isSendButtonDisabled() {
        return !this.isEmailValid(this.state.email) || this.state.saving;
    }

    private onCommentsChange(event: any) {
        this.setState({
            comments: event.target.value
        });
    }

    private onEmailChange(event: any) {
        this.setState({
            email: event.target.value
        });
    }

    private isEmailValid(email: string): boolean {
        var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        return re.test(email);
    }
        
    render() {
        var count = 0;
        return <div> 
            
            <div className="section log-section">

                <div className="form-group">
                    <label htmlFor="logReportTextArea">Logs: </label>
                    <textarea id="logReportTextArea" className="form-control" readOnly={true}
                        value={this.state.logStr}></textarea>                       
                </div>
                
            </div>

             <div className="section comments-section">

                <div className="form-group">
                    <label htmlFor="commentsArea">Comments: </label>
                    <textarea id="commentsArea" className="form-control"
                        readOnly={this.state.saving || this.state.sent}
                        value={this.state.comments} onChange={this.onCommentsChange.bind(this)}
                        placeholder="Please be as detailed as possible, it helps me to figure out what went wrong :)"></textarea>                       
                </div>
                
                 </div>


             <div className="section email-section">

                <div className="form-group">
                    <Input type="email" 
                        label="Email"
                        ref="input"
                        bsStyle={this.validationState() }
                        onChange={this.onEmailChange.bind(this)}
                        readOnly={this.state.saving || this.state.sent}
                        value={this.state.email} hasFeedback 
                        placeholder="So I can get back to you!" />
                </div>

            </div>

             <div className="section" hidden={this.state.sent}>
                 <Alert bsStyle="danger" hidden={this.state.error==null}>
                    <strong>Whoops!</strong> {this.state.error}
                </Alert>
                <Button disabled={this.isSendButtonDisabled()} bsStyle="primary" onClick={this.reportError.bind(this) }>
                    {this.state.saving?"Sending logs, this may take a minute ("+this.state.filesize+")...":"Submit"}
                </Button>
            </div>

            <div className="section" hidden={!this.state.sent}>
                Sent! Thanks for your help :)
            </div>
                    
        </div>
    }    
}