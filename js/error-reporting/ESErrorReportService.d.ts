import { IErrorReportSaver } from "./ErrorReporting";
import { ILogger, ILog } from "../logging/Logging";
export declare class ESErrorReportService implements IErrorReportSaver {
    private logger;
    private rootUrl;
    private app;
    private appVersion;
    constructor(logger: ILogger, rootUrl: string, app: string, appVersion: string);
    save(comments: string, email: string, logs: ILog[]): Promise<void>;
}
