import { IErrorReportSaver, IErrorReport } from "./ErrorReporting";
import * as axios from "axios";
import { ILogger, ILog } from "mikeysee-helpers";
import * as lzjs from "lzjs";

export class ESErrorReportService implements IErrorReportSaver {
    
    constructor(private logger:ILogger, private rootUrl:string,
        private app:string, private appVersion:string)
    {
        
    }
    
    async save(comments:string, email:string, logs:ILog[])
    {                
        var report : IErrorReport = {
            comments,
            email,
            logs,
            app: this.app,
            appVersion: this.appVersion
        }
        
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
        await axios.post(url, report);    
    }
}