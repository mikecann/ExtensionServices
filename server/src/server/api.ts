import * as express from "express";

export function setup(app:express.Application, authRoutes:express.Router)
{
    
    
    app.get('/api/ping', (request, response) => {
        console.log("Got a ping");
        response.send('ping right back at ya');
    });
    
    
    
    authRoutes.get('/api/authPing', (request, response) => {
        console.log("Got a ping");   
        response.send('ping right back at ya');
    });
    
    
    
}