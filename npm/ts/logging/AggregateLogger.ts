import { ILogger } from "./Logging";

export class AggregateLogger implements ILogger {
    loggers: ILogger[];

    constructor() {
        this.loggers = [];
    }

    debug(...args: any[]) {
        for (var logger of this.loggers)
            logger.debug(...args);
    }
    info(...args: any[]) {
        for (var logger of this.loggers)
            logger.info(...args);
    }
    warn(...args: any[]) {

        for (var logger of this.loggers)
            logger.warn(...args);
    }
    error(...args: any[]) {
        for (var logger of this.loggers)
            logger.error(...args);
    }
}