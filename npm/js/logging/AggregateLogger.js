"use strict";
class AggregateLogger {
    constructor() {
        this.loggers = [];
    }
    debug(...args) {
        for (var logger of this.loggers)
            logger.debug(...args);
    }
    info(...args) {
        for (var logger of this.loggers)
            logger.info(...args);
    }
    warn(...args) {
        for (var logger of this.loggers)
            logger.warn(...args);
    }
    error(...args) {
        for (var logger of this.loggers)
            logger.error(...args);
    }
}
exports.AggregateLogger = AggregateLogger;
