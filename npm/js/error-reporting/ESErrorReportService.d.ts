import { IErrorReportSaver, IErrorReport } from "./ErrorReporting";
export declare class ESErrorReportService implements IErrorReportSaver {
    constructor();
    save(report: IErrorReport): Promise<void>;
}
