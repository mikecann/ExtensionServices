import * as React from "react";
import * as ReactDOM from "react-dom";
import { Input, Button, Tabs, Tab, Alert, ButtonToolbar } from 'react-bootstrap';
import * as $ from "jquery";
import { Loading } from "./components/Loading";
import { LoginPage } from "./components/LoginPage";
import * as auth from "./services/AuthService";
import { goto, CATEGORIES } from './Routes';
import {Header} from "./Header";

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
        
        return <div style={{padding: 10}}>
            <Header />            
            <div className="container" style={{ marginTop: 40}}>
                {auth.isAuthenticated() ? this.renderAuthed() : this.renderNotAuthed()}
            </div>                        
        </div>;
    }
}