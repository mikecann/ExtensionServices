import * as React from "react";
import * as ReactDOM from "react-dom";
import { goto, CATEGORIES } from './Routes';

interface Props {
}

interface State {
}

export class Header extends React.Component<Props, State>
{
    constructor(props: Props, context: any) {
        super(props, context);
        this.state = {
        };
    }

    render() {
       
        return <nav className="navbar navbar-default navbar-fixed-top">
            <div className="container">
                <div className="navbar-header">
                    <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                        
                    <a className="navbar-brand" href="#">Extension Services</a>
                    <ul className="nav navbar-nav">
                        {this.renderLinks()}                      
                    </ul>                        
                </div>
            </div>
        </nav>
    }

    renderLinks()
    {
        var split = window.location.pathname.split("/");       
        var activePath = (split && split.length>1) ? split[1] : "";
        return CATEGORIES.map((c,i) => <li key={i} className={activePath==c.path?"active":""}>
                <a href={`/${c.path}`}>{c.label}</a>
         </li>);
    }
}