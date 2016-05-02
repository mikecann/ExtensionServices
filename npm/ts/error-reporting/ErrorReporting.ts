export interface IErrorReportSaver
{
    save(report:IErrorReport) : Promise<void>
}

export interface IErrorReport {
    comments: string;
    version: string;
    log: string;
    email: string;
}