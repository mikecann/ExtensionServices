"use strict";
const LoggingHelpers_1 = require("./LoggingHelpers");
class NodeConsoleLogger {
    constructor(excludes = []) {
        this.excludes = excludes;
    }
    debug(...args) {
        this.log("debug", ...args);
    }
    info(...args) {
        this.log("info", ...args);
    }
    warn(...args) {
        this.log("warn", ...args);
    }
    error(...args) {
        this.log("error", ...args);
    }
    log(level, ...args) {
        if (!LoggingHelpers_1.LoggingHelpers.canLog(level))
            return;
        if (args.length > 1 && typeof args[0] == "object" && typeof args[1] == "string")
            args[0] = `${args[0].constructor.name} ->`;
        console.log(level.toUpperCase(), ...args);
    }
}
exports.NodeConsoleLogger = NodeConsoleLogger;
