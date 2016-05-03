import * as React from "react";
import { ILog } from "../logging/Logging";
import { IErrorReportSaver } from "./ErrorReporting";
export interface ErrorReportViewProps extends React.Props<any> {
    userEmail?: string;
    logs?: ILog[];
    saver: IErrorReportSaver;
}
export interface ErrorReportViewState extends React.Props<any> {
    logStr?: string;
    comments?: string;
    saving?: boolean;
    sent?: boolean;
    error?: string;
    email?: string;
}
export declare class ErrorReportView extends React.Component<ErrorReportViewProps, ErrorReportViewState> {
    constructor(props: ErrorReportViewProps, context: any);
    reportError(): Promise<void>;
    componentWillReceiveProps(nextProps: ErrorReportViewProps): void;
    private validationState();
    private isSendButtonDisabled();
    private onCommentsChange(event);
    private onEmailChange(event);
    private isEmailValid(email);
    render(): JSX.Element;
}
