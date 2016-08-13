export interface ILogger {
    debug(...args: any[]);
    info(...args: any[]);
    warn(...args: any[]);
    error(...args: any[]);
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