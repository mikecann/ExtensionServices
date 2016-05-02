import { ILogger, ILog } from "./Logging";
import * as moment from "moment";

export class LocalStorageLogger implements ILogger {
    private id: string;
    private startTime: moment.Moment;
    private log: ILog;

    constructor() {
        this.startTime = moment();
        this.id = this.startTime + " " + Math.random();
        this.log = {
            id: this.id,
            date: this.startTime + " ",
            log: []
        };
    }

    debug(...args: any[]) {
        this.record("DEBUG", ...args);
    }
    info(...args: any[]) {
        this.record("INFO", ...args);
    }
    warn(...args: any[]) {
        this.record("WARN", ...args);
    }
    error(...args: any[]) {
        this.record("ERROR", ...args);
    }

    private getParamsStr(...args: any[]): string[] {
        return args.map(a => {
            try {
                return JSON.stringify(a);
            } catch (e) {
                return "<Couldnt Stringify>";
            }
        })
            .map(s => {
                var maxLen = 100;
                return s.length > maxLen ?
                    s.substring(0, maxLen - 3) + "..." :
                    s.substring(0, maxLen);
            });
    }

    private getStack(): string {
        var err = <any>new Error();
        return err.stack;
    }

    private record(level: string, ...args: any[]) {
        this.log.log.push({
            level: level,
            params: this.getParamsStr(...args),
            time: moment() + ""
        });

        var logStr = JSON.stringify(this.log);
        localStorage.setItem("log - " + this.id, logStr);
    }
}