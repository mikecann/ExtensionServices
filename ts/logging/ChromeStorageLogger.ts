import { ILogger, ILog } from "mikeysee-typescript-helpers";
import * as moment from "moment";

export class ChromeStorageLogger implements ILogger {
    private id: string;
    private startTime: moment.Moment;
    private log: ILog;
    private storage: chrome.storage.StorageArea;
    private isDirty: Boolean;

    constructor(area: chrome.storage.StorageArea) {
        this.storage = area;
        this.isDirty = true;
        this.startTime = moment();
        this.id = this.startTime.format("dddd, MMMM Do YYYY, h:mm:ss a") + " " + Math.random();
        this.log = {
            id: this.id,
            date: this.startTime + "",
            log: []
        };
        setInterval(() => this.save(), 1000);
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
        var stackStr: string = err.stack;
        const matches = stackStr.match(/AggregateLogger.debug \(chrome-extension.*?\)\s*at\s([\s\S]*)/);
        if (matches == null || matches.length < 2)
            return stackStr;

        return matches[1];
    }

    private save() {
        
        if (!this.isDirty)
            return;

        this.isDirty = false;

        var packet = {};
        packet["log" + " " + this.id] = this.log;
        this.storage.set(packet);
    }

    private record(level: string, ...args: any[]) {

        if (args.length > 1 && typeof args[0] == "object" && typeof args[1] == "string")
            args[0] = `${args[0].constructor.name} ->`;

        this.log.log.push({
            level: level,
            params: args,
            time: moment() + ""
        });

        this.isDirty = true;
    }
}