"use strict";
function setup(app, authRoutes) {
    app.get('/api/ping', (request, response) => {
        console.log("Got a ping");
        response.send('ping right back at ya');
    });
    authRoutes.get('/api/authPing', (request, response) => {
        console.log("Got a ping");
        response.send('ping right back at ya');
    });
}
exports.setup = setup;
