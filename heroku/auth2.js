"use strict";
function auth(req, res, next) {
    if (!req.isAuthenticated())
        res.send(401);
    else
        next();
}
exports.auth = auth;
function setup(authRoutes, app, db) {
}
exports.setup = setup;
