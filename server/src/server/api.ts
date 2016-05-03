import * as express from "express";
import { Db, ObjectID } from "mongodb";
import * as Sendgrid from "sendgrid";

export function setup(app:express.Application, db:Db)
{
    app.get('/api/ping', (request, response) => {
        response.send('ping right back at ya');
    });    
    
    app.post('/api/errorReport', async (request, response) => {       
        console.log("saving error report", request.body)
        
        await db.collection("errorReports").insertOne(request.body);
        //var sg = new Sendgrid("ptt_admin", "rLfiwDO3P9FV");
        //sg.send()
        
        response.send('Saved');
        
    });
    
    app.get('/api/errorReport', async (request, response) => {       
        var id = request.query.id;
        console.log("getting error report", id)
        var results = await db.collection("errorReports").find({ _id: new ObjectID(id) }).limit(1).toArray();
        response.json(results.length==0?null:results[0]);
    });
    
    app.get('/api/authPing', (request, response) => {
        response.send('ping right back at ya');
    });
}