"use strict";
class ESErrorReportService {
    constructor() {
    }
    save(report) {
        return null;
        // var base64 = btoa(unescape(encodeURIComponent(this.state.logStr)));
        // console.log("Saving logs..", this.state.logStr.length, base64.length);
        // this.setState({ filesize: (base64.length / 1000) + "Kb" })
        // var file = new Parse.File("logs.json", { base64: base64 });
        // file.save()
        //     .then(() => {
        //         console.log("Logs saved, reporting error..");
        //         var packet: ErrorReport = {
        //             email: this.state.email,
        //             comments: this.state.comments,
        //             logs: file,
        //             version: AppHelpers.version
        //         }
        //         return Parse.Cloud.run("reportError", packet);
        //     })
        //     .then(result => {
        //         console.log("Error reported", result);
        //         LoggingHelpers.clearOldLogs(chrome.storage.local, moment());
        //         this.setState({ saving: false, sent: true });
        //         return Parse.Promise.as({});
        //     })
        //     .fail(err => {
        //         console.log("Error during the reporting!", err);
        //         this.setState({ saving: false, error: err.message });
        //     });
    }
}
exports.ESErrorReportService = ESErrorReportService;
