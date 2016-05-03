"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const axios = require("axios");
const lzjs = require("lzjs");
class ESErrorReportService {
    constructor(logger, rootUrl) {
        this.logger = logger;
        this.rootUrl = rootUrl;
    }
    save(report) {
        return __awaiter(this, void 0, void 0, function* () {
            // If its an array we need to compress it
            if (typeof report.logs !== "string") {
                var before = JSON.stringify(report.logs);
                var after = lzjs.compress(before);
                this.logger.debug(this, "Logs compressed", { before: before.length, after: after.length });
                report.logs = after;
            }
            var url = this.rootUrl + "/api/errorReport";
            this.logger.debug(this, "Saving error report", { url: url });
            return axios.post(url, report);
        });
    }
}
exports.ESErrorReportService = ESErrorReportService;
