import * as moment from "moment";
export class LoggingHelpers {
    static isCloseToFull(storage, callback) {
        storage.getBytesInUse(null, bytes => {
            if (bytes > chrome.storage.local.QUOTA_BYTES * 0.8)
                return callback();
        });
    }
    static getLogs(storage) {
        return new Promise((resolve, reject) => {
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
    static filterByMaxLength(logs, maxLen) {
        var count = 0;
        return logs.filter(l => {
            if (count > maxLen)
                return false;
            var str = JSON.stringify(l);
            count += str.length;
            return count < maxLen;
        });
    }
    static clearOldLogs(storage, maxAge) {
        return new Promise((resolve, reject) => {
            storage.get(null, data => {
                for (var key of Object.keys(data)) {
                    if (key.substr(0, 3) == "log") {
                        var log = data[key];
                        var logData = moment(parseInt(log.date));
                        storage.remove(key);
                    }
                }
                resolve();
            });
        });
    }
    static canLog(level) {
        var requiredIndx = this.logLevels.indexOf(this.logLevel);
        if (requiredIndx == -1)
            requiredIndx = 2;
        var levelIndx = this.logLevels.indexOf(level);
        if (levelIndx == -1)
            levelIndx = 2;
        return levelIndx >= requiredIndx;
    }
}
LoggingHelpers.logLevels = ["debug", "info", "warn", "error"];
LoggingHelpers.logLevel = "debug";
