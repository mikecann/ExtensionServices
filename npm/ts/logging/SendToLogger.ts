import { ILogger } from "./Logging";

export class SendToLogger implements ILogger {
    private target: ILogger;

    constructor(target: ILogger) {
        this.target = target;
    }

    debug(...args: any[]) {
        this.target.debug(...args);
    }

    info(...args: any[]) {
        this.target.info(...args);
    }

    warn(...args: any[]) {
        this.target.warn(...args);
    }

    error(...args: any[]) {
        this.target.error(...args);
    }
}