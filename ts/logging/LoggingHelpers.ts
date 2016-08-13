import * as moment from "moment";
import { ILog } from "./Logging";

export class LoggingHelpers {
    static logLevels = ["debug", "info", "warn", "error"];
    static logLevel: string = "debug";

    static isCloseToFull(storage: chrome.storage.StorageArea, callback: () => void) {
        storage.getBytesInUse(null, bytes => {
            if (bytes > chrome.storage.local.QUOTA_BYTES * 0.8)
                return callback();
        });
    }

    static getLogs(storage: chrome.storage.StorageArea): Promise<ILog[]> {
        return new Promise<ILog[]>((resolve, reject) => {
            storage.get(null, data => {
                var logs = [];
                for (var key of Object.keys(data)) {
                    if (key.substr(0, 3) == "log")
                        logs.push(data[key]);
                }
                resolve(logs);
            });
        });
    }

    static filterByMaxLength(logs: ILog[], maxLen: number): ILog[] {
        var count = 0;
        return logs.filter(l => {
            if (count > maxLen)
                return false;

            var str = JSON.stringify(l);
            count += str.length;

            return count < maxLen;
        });
    }

    static clearOldLogs(storage: chrome.storage.StorageArea, maxAge?: moment.Moment) {        
        return new Promise<void>((resolve, reject) => {
            storage.get(null, data => {
                for (var key of Object.keys(data)) {
                    if (key.substr(0, 3) == "log") {
                        var log: ILog = data[key];
                        var logData = moment(parseInt(log.date));
                        storage.remove(key);
                    }
                }
                resolve();
            });
        });        
    }

    static canLog(level: string): boolean {
        var requiredIndx = this.logLevels.indexOf(this.logLevel);
        if (requiredIndx == -1)
            requiredIndx = 2;

        var levelIndx = this.logLevels.indexOf(level);
        if (levelIndx == -1)
            levelIndx = 2;

        return levelIndx >= requiredIndx;
    }
}