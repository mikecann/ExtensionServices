import { ILogger } from "./Logging";
import { LoggingHelpers } from "./LoggingHelpers";

export class NodeConsoleLogger implements ILogger {
    private excludes: string[];

    constructor(excludes: string[] = []) {
        this.excludes = excludes;
    }

    debug(...args: any[]) {
        this.log("debug", ...args);
    }
    info(...args: any[]) {

        this.log("info", ...args);
    }
    warn(...args: any[]) {
        this.log("warn", ...args);
    }
    error(...args: any[]) {
        this.log("error", ...args);
    }

    private log(level: string, ...args: any[]) {
        if (!LoggingHelpers.canLog(level))
            return;

        if (args.length > 1 && typeof args[0] == "object" && typeof args[1] == "string")
            args[0] = `${args[0].constructor.name} ->`;

        console.log(level.toUpperCase(), ...args);
    }
}