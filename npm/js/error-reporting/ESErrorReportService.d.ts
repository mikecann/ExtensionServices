import { IErrorReportSaver, IErrorReport } from "./ErrorReporting";
import { ILogger } from "../logging/Logging";
export declare class ESErrorReportService implements IErrorReportSaver {
    private logger;
    private rootUrl;
    constructor(logger: ILogger, rootUrl: string);
    save(report: IErrorReport): Promise<Axios.AxiosXHR<{}>>;
}
