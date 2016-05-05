"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const Sendgrid = require("sendgrid");
const config_1 = require("./config");
// Mandrill info
var sendgrid = Sendgrid(config_1.default.sendGridKey);
// Email templates
var suggestionTemplate = "<h1>Post To Tumblr {{version}} Suggestion Submitted!</h1>" +
    "<p><strong>Suggestion:</strong><br/>{{suggestion}}</p>" +
    "<p><strong>Email:</strong><br/>{{email}}</p>";
var reportErrorTemplate = "<h1>{{app}} {{version}} Error</h1>" +
    "<p><strong><a href='http://extension-services.herokuapp.com/errorReport/{{reportId}}'>View Log</a></strong></p>" +
    "<p><strong>Comments:</strong><br/>{{comments}}</p>" +
    "<p><strong>Email:</strong><br/>{{email}}</p>";
// export function sendSuggestion(suggestion: Suggestion, user:Parse.User, pttVersion:string) : Parse.Promise<Parse.Cloud.HTTPResponse> {
//     return send("PTT Suggestion", suggestionTemplate, {
//         "{{version}}": pttVersion,
//         "{{suggestion}}": suggestion.suggestion,
//         "{{email}}": user.getEmail()
//     });
// } 
function sendErrorReport(report, reportId) {
    return __awaiter(this, void 0, void 0, function* () {
        yield send(report.app + " Error Report", reportErrorTemplate, report.email, {
            "{{app}}": report.app,
            "{{version}}": report.appVersion,
            "{{reportId}}": reportId,
            "{{comments}}": report.comments.split("\n").join("<br />"),
            "{{email}}": report.email
        });
    });
}
exports.sendErrorReport = sendErrorReport;
// export function sendTest() : Parse.Promise<Parse.Cloud.HTTPResponse>
// {
//     return send("PTT Test Email", "This is a test tmeail", {});
// }
function send(subject, templateName, replyTo, vars) {
    console.log("Sending email", { subject: subject, templateName: templateName });
    return new Promise((resolve, reject) => {
        sendgrid.send({
            to: ["mike@cannstudios.com"],
            from: "mike@cannstudios.com",
            fromname: "Mike From Post To Tumblr",
            replyto: "mike@cannstudios.com",
            subject: subject,
            html: template(templateName, vars)
        }, (err, json) => {
            if (err) {
                console.error("Sendgrid email send error", err);
                reject(err);
            }
            else
                resolve(json);
        });
    });
}
function template(template, vars) {
    var t = template;
    Object.keys(vars).forEach(key => {
        t = t.replace(key, vars[key]);
    });
    return t;
}
