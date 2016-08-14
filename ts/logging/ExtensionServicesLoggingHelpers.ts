import * as moment from "moment";
import { ILog } from "mikeysee-typescript-helpers";

export class ExtensionServicesLoggingHelpers {
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
}