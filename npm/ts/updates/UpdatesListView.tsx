import * as React from "react";
import * as ReactDOM from "react-dom";
import { UpdateHelpers } from "./UpdateHelpers"
import { IUpdate } from "./Updates"
import * as marked from "marked";

export interface UpdatesListProps extends React.Props<any> {
    manifestUrl: string;
}

export interface UpdatesListState extends React.Props<any> {
    updates?: IUpdate[];
}

export class UpdatesListView extends React.Component<UpdatesListProps, UpdatesListState> {
    
    constructor(props: UpdatesListProps, context: any) {
        super(props, context);
        this.state = { 
            updates: [],
        };
        
        this.loadUpdates(props.manifestUrl);
    }
    
    componentWillReceiveProps(newProps:UpdatesListProps)
    {
        this.loadUpdates(newProps.manifestUrl);
    }    
    
    async loadUpdates(manifest:string)
    {
        var updates = await UpdateHelpers.load(this.props.manifestUrl);
        //logger.debug(this, "Updates loaded from disk", updates);        
        this.setState({ updates });
    }
    
    rawMarkup(update:IUpdate) {
        var rawMarkup = marked(update.notes, { sanitize: true });
        return { __html: rawMarkup };
    }    
    
    renderUpdate(u:IUpdate, count:number)
    {
        return <div key={count}>
            <h2 className="update-title">New in {u.version} ({u.date}) </h2>      
            <p dangerouslySetInnerHTML={this.rawMarkup(u) } />     
        </div>;
    }
    
    render() {
        var count = 0;
        return <div>     
            { this.state.updates.map(u => this.renderUpdate(u, count++)) }            
        </div>
    }    
}