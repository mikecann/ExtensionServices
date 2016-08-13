import { ILog } from "../logging/Logging";
export interface IErrorReportSaver {
    save(comments: string, email: string, logs: ILog[]): Promise<any>;
}
export interface IErrorReport {
    comments: string;
    app: string;
    appVersion: string;
    logs: ILog[] | string;
    email: string;
}
