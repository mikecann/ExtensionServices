import * as Sendgrid from "sendgrid";

// Mandrill info
var sendgrid = new Sendgrid("ptt_admin", "rLfiwDO3P9FV");

// Email templates
var suggestionTemplate = "<h1>Post To Tumblr {{version}} Suggestion Submitted!</h1>" +
    "<p><strong>Suggestion:</strong><br/>{{suggestion}}</p>" +
    "<p><strong>Email:</strong><br/>{{email}}</p>";        	

var reportErrorTemplate = "<h1>Post To Tumblr {{version}} Error!</h1>" +
    "<p><strong>Output Log:</strong><br/>{{output}}</p>" +
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
        //"{{output}}": report.output.split("\n").join("<br />"),
        "{{comments}}": report.comments.split("\n").join("<br />"),
        "{{email}}": report.email
    });
}

// export function sendTest() : Parse.Promise<Parse.Cloud.HTTPResponse>
// {
//     return send("PTT Test Email", "This is a test tmeail", {});
// }

function send(subject:string, templateName: string, vars: any) : Parse.Promise<Parse.Cloud.HTTPResponse>
{   
    // // Init our email agent
    // Mandrill.initialize(mandrilApiKey);

    //  // Construct the email
    // var msg: Mandrill.Message = {
    //     html: template(templateName, vars),
    //     auto_text: true,
    //     subject: subject,
    //     to: [{ email: "mike@cannstudios.com", name: "Mike Cann" }],
    //     from_email: "mike@cannstudios.com",
    //     inline_css: true
    // };

    // // Send
    // var promise = new Parse.Promise<Parse.Cloud.HTTPResponse>();
    // Mandrill.sendEmail({ async: false, message: msg },
    // {
    //     success: httpResponse => promise.resolve(httpResponse),
    //     error: httpResponse => promise.reject(httpResponse)
    // });
    // return promise;


    return sendgrid.send({
        to: ["mike@cannstudios.com"],
        from: "mike@cannstudios.com",
        fromname: "Admin of Post To Tumblr",
        replyto: "mike@cannstudios.com",
        html: template(templateName, vars),
        subject: subject      
    })
}

function template(template:string, vars:any) :string
{
    var t = template;
    Object.keys(vars).forEach(key => {
        t = t.replace(key, vars[key]);
    });        
    return t;
}
