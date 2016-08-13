import { LoggingHelpers } from "./LoggingHelpers";
export class ConsoleLogger {
    constructor(excludes = []) {
        this.LEVEL_CSS = {
            debug: "color: blue",
            info: "color: teal",
            warn: "color: orange",
            error: "color: red"
        };
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
        if (!LoggingHelpers.canLog(level))
            return;
        if (args.length > 0 && this.isExcluded(args[0]))
            return false;
        if (args.length > 1 && typeof args[0] == "object" && typeof args[1] == "string")
            args[0] = `${args[0].constructor.name} ->`;
        console.log("%c" + level.toUpperCase(), this.LEVEL_CSS[level], ...args);
    }
    isExcluded(arg) {
        return this.excludes.indexOf(arg) != -1;
    }
}
