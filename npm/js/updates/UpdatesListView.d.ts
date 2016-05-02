import * as React from "react";
import { IUpdate } from "./Updates";
export interface UpdatesListProps extends React.Props<any> {
    manifestUrl: string;
}
export interface UpdatesListState extends React.Props<any> {
    updates?: IUpdate[];
}
export declare class UpdatesListView extends React.Component<UpdatesListProps, UpdatesListState> {
    constructor(props: UpdatesListProps, context: any);
    componentWillReceiveProps(newProps: UpdatesListProps): void;
    loadUpdates(manifest: string): Promise<void>;
    rawMarkup(update: IUpdate): {
        __html: string;
    };
    renderUpdate(u: IUpdate, count: number): JSX.Element;
    render(): JSX.Element;
}
