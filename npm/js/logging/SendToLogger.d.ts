import { ILogger } from "./Logging";
export declare class SendToLogger implements ILogger {
    private target;
    constructor(target: ILogger);
    debug(...args: any[]): void;
    info(...args: any[]): void;
    warn(...args: any[]): void;
    error(...args: any[]): void;
}
