import { ILogger } from "./Logging";
export declare class LocalStorageLogger implements ILogger {
    private id;
    private startTime;
    private log;
    constructor();
    debug(...args: any[]): void;
    info(...args: any[]): void;
    warn(...args: any[]): void;
    error(...args: any[]): void;
    private getParamsStr(...args);
    private getStack();
    private record(level, ...args);
}
