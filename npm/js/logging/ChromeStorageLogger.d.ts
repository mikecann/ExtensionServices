import { ILogger } from "./Logging";
export declare class ChromeStorageLogger implements ILogger {
    private id;
    private startTime;
    private log;
    private storage;
    private isDirty;
    constructor(area: chrome.storage.StorageArea);
    debug(...args: any[]): void;
    info(...args: any[]): void;
    warn(...args: any[]): void;
    error(...args: any[]): void;
    private getParamsStr(...args);
    private getStack();
    private save();
    private record(level, ...args);
}
