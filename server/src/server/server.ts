/// <reference path="../typings/tsd.d.ts" />

import * as express from "express";
import * as bodyParser from "body-parser";
import { MongoClient, ObjectID } from "mongodb";
import * as jwt from "jsonwebtoken";
import { default as config } from "./config";
import * as auth from "./auth";
import * as api from "./api";
import * as morgan from "morgan";

var app = express();

MongoClient.connect(config.dbURI, (err, db) => {

    if (err)
        throw err;

    app.set('port', (process.env.PORT || 5000));

    app.set('jwtSecret', config.jwtSecret);
    app.use(express.static(__dirname + '/public'));
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(morgan("dev"));

    // views is directory for all template files
    app.set('views', __dirname + '/public/views');
    app.set('view engine', 'ejs');     
    
    // Hacky solution for now..
    app.get('/', (request, response) => response.render('pages/index'));
    app.get('/errorReport', (request, response) => response.render('pages/index'));
    app.get('/errorReport/:id', (request, response) => response.render('pages/index'));
    
    // Create the routes that must be authenticated to visit
    //var authRoutes = express.Router(); 
    //auth.setup(authRoutes, app, db);  
    api.setup(app, db);
    //app.use(authRoutes);    
    
    // This is an SPA so return the homepage on any unknown route
    app.get('*', (request, response) => {
        response.render('pages/index');
    }); 

    app.listen(app.get('port'), function() {
        console.log('Node app is running on port', app.get('port'), app.get('env'));
    });
})
