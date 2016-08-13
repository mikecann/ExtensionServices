import * as moment from "moment";
export class ChromeStorageLogger {
    constructor(area) {
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
    debug(...args) {
        this.record("DEBUG", ...args);
    }
    info(...args) {
        this.record("INFO", ...args);
    }
    warn(...args) {
        this.record("WARN", ...args);
    }
    error(...args) {
        this.record("ERROR", ...args);
    }
    getParamsStr(...args) {
        return args.map(a => {
            try {
                return JSON.stringify(a);
            }
            catch (e) {
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
    getStack() {
        var err = new Error();
        var stackStr = err.stack;
        const matches = stackStr.match(/AggregateLogger.debug \(chrome-extension.*?\)\s*at\s([\s\S]*)/);
        if (matches == null || matches.length < 2)
            return stackStr;
        return matches[1];
    }
    save() {
        if (!this.isDirty)
            return;
        this.isDirty = false;
        var packet = {};
        packet["log" + " " + this.id] = this.log;
        this.storage.set(packet);
    }
    record(level, ...args) {
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
