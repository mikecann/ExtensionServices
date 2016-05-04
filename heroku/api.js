"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const mongodb_1 = require("mongodb");
const email = require("./email");
function setup(app, db) {
    app.get('/api/ping', (request, response) => {
        response.send('ping right back at ya');
    });
    app.post('/api/errorReport', (request, response) => __awaiter(this, void 0, void 0, function* () {
        var report = request.body;
        console.log("saving error report", report);
        var result = yield db.collection("errorReports").insertOne(report);
        report._id = result.insertedId;
        yield email.sendErrorReport(report, "1.0");
        response.send('Saved');
    }));
    app.get('/api/errorReport', (request, response) => __awaiter(this, void 0, void 0, function* () {
        var id = request.query.id;
        console.log("getting error report", id);
        var results = yield db.collection("errorReports").find({ _id: new mongodb_1.ObjectID(id) }).limit(1).toArray();
        response.json(results.length == 0 ? null : results[0]);
    }));
    app.get('/api/authPing', (request, response) => {
        response.send('ping right back at ya');
    });
}
exports.setup = setup;
