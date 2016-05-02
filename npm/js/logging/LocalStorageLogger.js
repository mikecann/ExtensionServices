"use strict";
const moment = require("moment");
class LocalStorageLogger {
    constructor() {
        this.startTime = moment();
        this.id = this.startTime + " " + Math.random();
        this.log = {
            id: this.id,
            date: this.startTime + " ",
            log: []
        };
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
        return err.stack;
    }
    record(level, ...args) {
        this.log.log.push({
            level: level,
            params: this.getParamsStr(...args),
            time: moment() + ""
        });
        var logStr = JSON.stringify(this.log);
        localStorage.setItem("log - " + this.id, logStr);
    }
}
exports.LocalStorageLogger = LocalStorageLogger;
