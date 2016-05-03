import { Router, Route, Link, IndexRoute, browserHistory  } from 'react-router';
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Layout } from "./Layout"
import { ErrorReportViewerPage } from "./components/ErrorReportViewerPage";
import { LoginPage } from "./components/LoginPage";

export const CATEGORIES = [
    {
        component: ErrorReportViewerPage,
        path: "errorReport",
        label: "Error Report Viewer"
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
        <Route path="login" component={LoginPage} />
        <Route path="errorReport/:id" component={ErrorReportViewerPage} />
        {CATEGORIES.map(c => <Route path={c.path} component={c.component} key={c.path} /> )}        
    </Route>
    
</Router>;

