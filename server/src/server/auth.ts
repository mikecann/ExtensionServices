import * as express from "express";
import * as jwt from "jsonwebtoken";
import { MongoClient, Db } from "mongodb";

export function setup(router:express.Router, app:express.Application, db:Db)
{
    router.use((req, res, next) => {        

        // check header or url parameters or post parameters for token
        var token = req.body.token || req.query.token || req.headers['x-access-token'];

        // decode token
        if (token) {

            // verifies secret and checks exp
            jwt.verify(token, app.get('jwtSecret'), (err, decoded) => {      
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });    
            } else {
                // if everything is good, save to request for use in other routes
                (req as any).decoded = decoded;    
                next();
            }
            });

        } else {

            // if there is no token
            // return an error
            return res.status(401).send({ 
                success: false, 
                message: 'No token provided, not authenticated' 
            });
            
        }
    });
    
    app.post('/api/authenticate', async (req, res) => {
        var email = req.body.email;
        var password = req.body.password;
        console.log("Got an auth request for ", email);           
        
        var users = await db.collection('users').find({ email }).toArray();
        console.log("Got users ", users);   
        
        if (users.length==0)
        {
            res.status(401).send({ 
                success: false, 
                message: 'Auth failed, user not found' 
            });
        }
        else if (users[0].password == password)
        {                            
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
    });
}