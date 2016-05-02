"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const jwt = require("jsonwebtoken");
function setup(router, app, db) {
    router.use((req, res, next) => {
        // check header or url parameters or post parameters for token
        var token = req.body.token || req.query.token || req.headers['x-access-token'];
        // decode token
        if (token) {
            // verifies secret and checks exp
            jwt.verify(token, app.get('jwtSecret'), (err, decoded) => {
                if (err) {
                    return res.json({ success: false, message: 'Failed to authenticate token.' });
                }
                else {
                    // if everything is good, save to request for use in other routes
                    req.decoded = decoded;
                    next();
                }
            });
        }
        else {
            // if there is no token
            // return an error
            return res.status(401).send({
                success: false,
                message: 'No token provided, not authenticated'
            });
        }
    });
    app.post('/api/authenticate', (req, res) => __awaiter(this, void 0, void 0, function* () {
        var email = req.body.email;
        var password = req.body.password;
        console.log("Got an auth request for ", email);
        var users = yield db.collection('users').find({ email: email }).toArray();
        console.log("Got users ", users);
        if (users.length == 0) {
            res.status(401).send({
                success: false,
                message: 'Auth failed, user not found'
            });
        }
        else if (users[0].password == password) {
            var token = jwt.sign(users[0], app.get('jwtSecret'), {
                expiresInMinutes: 1440 // expires in 24 hours
            });
            console.log("User authenticated", token);
            res.json({
                success: true,
                message: 'Enjoy your token!',
                token: token
            });
        }
        else
            res.status(401).send({
                success: false,
                message: 'Auth failed, invalid password'
            });
    }));
}
exports.setup = setup;
