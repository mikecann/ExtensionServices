export class SendToLogger {
    constructor(target) {
        this.target = target;
    }
    debug(...args) {
        this.target.debug(...args);
    }
    info(...args) {
        this.target.info(...args);
    }
    warn(...args) {
        this.target.warn(...args);
    }
    error(...args) {
        this.target.error(...args);
    }
}
