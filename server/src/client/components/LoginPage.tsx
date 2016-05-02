import * as React from "react";
import * as ReactDOM from "react-dom";
import { Input, Button, Tabs, Tab, Alert, ButtonToolbar, Well } from 'react-bootstrap';
import * as $ from "jquery";
import * as auth from "../services/AuthService";

interface Props extends React.Props<any> {
    onLoggedIn: ()=>void;
}

interface State extends React.Props<any> {
    isLoading?:boolean;
    email?:string;
    password?:string;
}

export class LoginPage extends React.Component<Props, State> {

    constructor(props: Props, context) {
        super(props, context);
        this.state = {
        };
    }    
    
    async login()
    {
        await auth.authenticate(this.state.email, this.state.password);
        this.props.onLoggedIn();
    }
    
    render() {      
        
        return <div style={{maxWidth: 500}}>
            <h1>Login to Extension Services Backend</h1>
            <Well>
                <Input type="text" label="Email" onChange={e => this.setState({ email: (e as any).target.value })} />
                <Input type="password" label="Password" onChange={e => this.setState({ password: (e as any).target.value })} />
                <Button bsStyle="primary" disabled={this.state.isLoading}
                    onClick={() => this.login()}>Login</Button>
            </Well>
        </div>;
    }
}