import { ILogger } from "./Logging";
export declare class NodeConsoleLogger implements ILogger {
    private excludes;
    constructor(excludes?: string[]);
    debug(...args: any[]): void;
    info(...args: any[]): void;
    warn(...args: any[]): void;
    error(...args: any[]): void;
    private log(level, ...args);
}
