import { IErrorReportSaver, IErrorReport } from "./ErrorReporting";
import * as axios from "axios";
import { ILogger } from "../logging/Logging";
import * as lzjs from "lzjs";

export class ESErrorReportService implements IErrorReportSaver {
    
    constructor(private logger:ILogger, private rootUrl:string)
    {
        
    }
    
    async save(report: IErrorReport)
    {                
        // If its an array we need to compress it
        if (typeof report.logs !== "string")
        {
            var before = JSON.stringify(report.logs);
            var after = lzjs.compress(before);
            this.logger.debug(this, "Logs compressed", { before:before.length, after:after.length });
            report.logs = after;
        }            
        
        var url = this.rootUrl + "/api/errorReport";
        this.logger.debug(this, "Saving error report", {url});
        return axios.post(url, report);    
    }
}