import * as React from "react";
import * as ReactDOM from "react-dom";
import { Input, Button, Tabs, Tab, Alert } from 'react-bootstrap';
import * as $ from "jquery";

interface Props extends React.Props<any> {
}

interface State extends React.Props<any> {

}

export class Loading extends React.Component<Props, State> {

    constructor(props: Props, context) {
        super(props, context);
        this.state = {

        };
    }
    
    render() {        
        return <div>loading..</div>;
    }
}