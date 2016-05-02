export interface ILogger {
    debug(...args: any[]): any;
    info(...args: any[]): any;
    warn(...args: any[]): any;
    error(...args: any[]): any;
}
export interface ILog {
    id: string;
    date: string;
    log: ILogEntry[];
}
export interface ILogEntry {
    level: string;
    time: string;
    params: any[];
    stack?: string;
}
