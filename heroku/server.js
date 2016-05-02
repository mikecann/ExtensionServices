/// <reference path="../typings/tsd.d.ts" />
"use strict";
const express = require("express");
const bodyParser = require("body-parser");
const mongodb_1 = require("mongodb");
const config = require("./config");
const auth = require("./auth");
const api = require("./api");
var app = express();
mongodb_1.MongoClient.connect(config.liveDbUri, (err, db) => {
    if (err)
        throw err;
    app.set('port', (process.env.PORT || 5000));
    app.set('jwtSecret', config.jwtSecret);
    app.use(express.static(__dirname + '/public'));
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    // views is directory for all template files
    app.set('views', __dirname + '/public/views');
    app.set('view engine', 'ejs');
    // Create the routes that must be authenticated to visit
    var authRoutes = express.Router();
    auth.setup(authRoutes, app, db);
    app.get('/', (request, response) => {
        response.render('pages/index');
    });
    api.setup(app, authRoutes);
    app.use(authRoutes);
    app.get('*', (request, response) => {
        response.render('pages/index');
    });
    app.listen(app.get('port'), function () {
        console.log('Node app is running on port', app.get('port'), app.get('env'));
    });
});
