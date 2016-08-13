import { ILogger } from "./Logging";
export declare class AggregateLogger implements ILogger {
    loggers: ILogger[];
    constructor();
    debug(...args: any[]): void;
    info(...args: any[]): void;
    warn(...args: any[]): void;
    error(...args: any[]): void;
}
