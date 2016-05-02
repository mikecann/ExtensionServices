import { ILogger } from "./Logging";
export declare class ConsoleLogger implements ILogger {
    private excludes;
    private LEVEL_CSS;
    constructor(excludes?: string[]);
    debug(...args: any[]): void;
    info(...args: any[]): void;
    warn(...args: any[]): void;
    error(...args: any[]): void;
    private log(level, ...args);
    private isExcluded(arg);
}
