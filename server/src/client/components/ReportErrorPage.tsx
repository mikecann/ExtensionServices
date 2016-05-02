import * as React from "react";
import * as ReactDOM from "react-dom";
import { Input, Button, Tabs, Tab, Alert, ButtonToolbar, Well } from 'react-bootstrap';
import * as $ from "jquery";

interface Props extends React.Props<any> {
}

interface State extends React.Props<any> {
}

export class ReportErrorPage extends React.Component<Props, State> {

    constructor(props: Props, context) {
        super(props, context);
        this.state = {
        };
    }    
    
    render() {      
        
        return <div>
            <h1>Report Error</h1>
        </div>;
    }
}