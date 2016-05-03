import { ILog } from "../logging/Logging";

export interface IErrorReportSaver
{
    save(report:IErrorReport) : Promise<any>
}

export interface IErrorReport {
    comments: string;
    version: string;
    logs: ILog[] | string;
    email: string;
}