import * as Sendgrid from "sendgrid";



// Mandrill info
var sendgrid = (Sendgrid as any)("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") as Sendgrid.Instance;

// Email templates
var suggestionTemplate = "<h1>Post To Tumblr {{version}} Suggestion Submitted!</h1>" +
    "<p><strong>Suggestion:</strong><br/>{{suggestion}}</p>" +
    "<p><strong>Email:</strong><br/>{{email}}</p>";

var reportErrorTemplate = "<h1>Post To Tumblr {{version}} Error!</h1>" +
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

export async function sendErrorReport(report: any, pttVersion: string) {
    await send("PTT Error Report", reportErrorTemplate, {
        "{{version}}": pttVersion,
        "{{reportId}}": report._id,
        "{{comments}}": report.comments.split("\n").join("<br />"),
        "{{email}}": report.email
    });
}

// export function sendTest() : Parse.Promise<Parse.Cloud.HTTPResponse>
// {
//     return send("PTT Test Email", "This is a test tmeail", {});
// }

function send(subject: string, templateName: string, vars: any) {
    console.log("Sending email", { subject, templateName })
    return new Promise<any>((resolve, reject) => {
        sendgrid.send({
            to: ["mike@cannstudios.com"],
            from: "mike@cannstudios.com",
            fromname: "Mike From Post To Tumblr",
            replyto: "mike@cannstudios.com",
            subject,
            html: template(templateName, vars)
        },
        (err, json) => {
            if (err)
            {
                console.error("Sendgrid email send error", err);
                reject(err);
            }                
            else
                resolve(json);
        });
    })
}

function template(template: string, vars: any): string {
    var t = template;
    Object.keys(vars).forEach(key => {
        t = t.replace(key, vars[key]);
    });
    return t;
}