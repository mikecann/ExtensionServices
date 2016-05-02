import { Router, Route, Link, IndexRoute, browserHistory  } from 'react-router';
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Layout } from "./Layout"
import { ReportErrorPage } from "./components/ReportErrorPage";

export const CATEGORIES = [
    {
        component: ReportErrorPage,
        path: "reportError",
        label: "Report Error"
    },   
]

export function goto(route:string) {
    console.debug("Navigating to route: " + route);
    browserHistory.push(route); 
}

export function back()
{
    console.debug("Going back a page");
    browserHistory.goBack();
}

export const routes = <Router history={browserHistory}>

    <Route path="/" component={Layout}>
    
        {
            CATEGORIES.map(c => <Route path={c.path} component={c.component} key={c.path} /> )
        }
        
    </Route>
    
</Router>;

