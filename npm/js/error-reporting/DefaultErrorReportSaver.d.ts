import { IErrorReportSaver, IErrorReport } from "./ErrorReporting";
export declare class DefaultErrorReportSaver implements IErrorReportSaver {
    save(report: IErrorReport): Promise<void>;
}
