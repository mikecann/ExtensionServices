import { ILog } from "./Logging";
export declare class LoggingHelpers {
    static logLevels: string[];
    static logLevel: string;
    static isCloseToFull(storage: chrome.storage.StorageArea, callback: () => void): void;
    static getLogs(storage: chrome.storage.StorageArea): Promise<ILog[]>;
    static filterByMaxLength(logs: ILog[], maxLen: number): ILog[];
    static clearOldLogs(storage: chrome.storage.StorageArea, maxAge?: moment.Moment): Promise<void>;
    static canLog(level: string): boolean;
}
