import * as React from "react";
import * as ReactDOM from "react-dom";
import { Input, Button, Tabs, Tab, Alert, ButtonToolbar } from 'react-bootstrap';
import * as $ from "jquery";
import { Loading } from "./components/Loading";
import { LoginPage } from "./components/LoginPage";
import * as auth from "./services/AuthService";
import { goto, CATEGORIES } from './Routes';

interface Props extends React.Props<any> {
}

interface State extends React.Props<any> {
}

export class Layout extends React.Component<Props, State> {

    constructor(props: Props, context) {
        super(props, context);
        this.state = {
        };
    }
    
    componentDidMount()
    {
        console.log("Loading..");
    }
    
    renderAuthed()
    {
        return <div>
            <ButtonToolbar style={{ marginBottom: 20 }}>                
                {CATEGORIES.map(c => <Button bsStyle="default" onClick={() => goto(c.path)} key={c.path}>{c.label}</Button>)}                
            </ButtonToolbar>         
            { this.props.children }             
        </div>
    }
    
    renderNotAuthed()
    {
        return <div>
            <LoginPage onLoggedIn={() => this.forceUpdate()} />        
        </div>
    }
    
    render() {        
        return auth.isAuthenticated() ? this.renderAuthed() : this.renderNotAuthed();
    }
}