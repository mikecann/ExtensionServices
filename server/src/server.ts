import * as express from "express";
import * as bodyParser from "body-parser";
import { MongoClient, ObjectID } from "mongodb";

var app = express();


var dbUrl = "mongodb://mike:&1POhVSIS#Sh@ds015690.mlab.com:15690/chromestorespider";

MongoClient.connect(dbUrl, (err, db) => {

    if (err)
        throw err;

    app.set('port', (process.env.PORT || 5000));

    app.use(express.static(__dirname + '/public'));
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    // views is directory for all template files
    app.set('views', __dirname + '/views');
    app.set('view engine', 'ejs');    

    app.get('/api/ping', (request, response) => {
        console.log("Got a ping");
        response.send('ping right back at ya');
    });
    
    app.get('/api/productCount', (request, response) => {
        db.collection("products").count({})
            .then(count => response.json({count}))
            .catch(err => console.error("Whoopsie! "+err));
    });    
    
    app.get('/api/latestProducts', (request, response) => {        
        var limit = Math.min(100, request.query.limit ? parseInt(request.query.limit) : 10);
        var withSnapshots =   request.query.withSnapshots;
        
        var query = {};
        if (withSnapshots)
            query = { snapshots: { $not: { $size: 0 } } }        
        
        db.collection("products")
            .find(query)
            .limit(limit)
            .sort({ "snapshots.dateTaken": -1 })
            .toArray()
            .then(products => response.json({products}))
            .catch(err => console.error("Whoopsie! "+err));
    });  
    
    app.get('/api/popularProducts', (request, response) => {        
        var limit = Math.min(100, request.query.limit ? parseInt(request.query.limit) : 10);
              
        var query = { snapshots: { $not: { $size: 0 } } };
        
        db.collection("products")
            .find(query)
            .sort({ "snapshots.users": -1 })
            .limit(limit)
            .toArray()
            .then(products => response.json({products}))
            .catch(err => console.error("Whoopsie! "+err));
    });  
    
    app.get('/api/oldProducts', (request, response) => {        
        var limit = request.query.limit ? parseInt(request.query.limit) : 10;
        var ageDays = request.query.ageDays ? parseInt(request.query.ageDays) : 365;
        
        var timeMs = Date.now() - (ageDays * 24 * 60 * 60 * 1000);
        var query = {
            $where: "this.snapshots.length > 0 && this.snapshots[this.snapshots.length-1].error == undefined && this.snapshots[this.snapshots.length-1].lastUpdatedAt < " + timeMs
        };
        
        console.log("Getting old products", query)
                
        db.collection("products")
            .find(query)
            .sort({ "snapshots.users": -1 })
            .limit(limit)
            .toArray()
            .then(products => response.json({products}))
            .catch(err => console.error("Whoopsie! "+err));
    });  
    
    app.get('/api/ratingsDisparity', (request, response) => {        
        var limit = request.query.limit ? parseInt(request.query.limit) : 10;
        var disparity = request.query.disparity ? parseInt(request.query.disparity) : 2;

        var query = { $where: "if (this.snapshots.length==0) return false;" +
        "var last = this.snapshots[this.snapshots.length-1];" +
        "if (last.reviews==null) return false;"+
        "if (last.reviews.length==0) return false;"+
        "var averageReviews = last.reviews.map(function(r){ return r.stars }).reduce(function(a, b){ return a + b; }) / last.reviews.length;" +
        "return Math.abs(averageReviews-last.rating) > "+disparity+";" }
                        
        db.collection("products")
            .find(query)
            .sort({ "snapshots.users": -1 })
            .limit(limit)
            .toArray()
            .then(products => response.json({products}))
            .catch(err => console.error("Whoopsie! "+err));
            
    });      
    
     app.get('/api/miscProducts', (request, response) => {        
        var limit = request.query.limit ? parseInt(request.query.limit) : 10;
        var withNegativeUsers = request.query.withNegativeUsers ?  request.query.withNegativeUsers=="true" : false;
        var withErrors = request.query.withErrors ?  request.query.withErrors=="true" : false;
        var withDuplicateIds = request.query.withDuplicateIds ?  request.query.withDuplicateIds=="true" : false;
        
        var query = {};
        
        console.log("getting misc: ",{withNegativeUsers});
        
        if (withNegativeUsers)       
            query = { snapshots: { $not: { $size: 0 } }, "snapshots.users": { $lt: 0 } };
        
        if (withErrors)
            query = { snapshots: { $not: { $size: 0 } }, "snapshots.error": { $exists: true } };
            
        if (withDuplicateIds)
        {
            query = { snapshots: { $not: { $size: 0 } }, "snapshots.error": { $exists: true } };
            
            (db.collection("products") as any).aggregate([
                { $group: {
                    _id: { id: "$id" }, 
                    uniqueIds: { $addToSet: "$_id" },
                    count: { $sum: 1 } 
                } }, 
                { $match: { 
                    count: { $gte: 2 } 
                } },
                { $sort : { count : -1} },
                { $limit : 10 }
            ])
            .limit(limit)
            .toArray()
            .then(products => response.json({products}))
            .catch(err => console.error("Whoopsie! "+err));
            
            return;
        }                      
                
        db.collection("products")
            .find(query)
            .sort({})
            .limit(limit)
            .toArray()
            .then(products => response.json({products}))
            .catch(err => console.error("Whoopsie! "+err));
    }); 
    
     app.get('/api/queryProducts', (request, response) => {        
        var limit = Math.min(100, request.query.limit ? parseInt(request.query.limit) : 10);
        var name =   request.query.name;
        var id =   request.query.id;

        var query : any = { };
        
        if (name)                     
            query = { "snapshots.name": { $regex: ".*"+name+".*", $options: "i" } };
            
        if (id)
            query = { id };
                        
        db.collection("products")
            .find(query)
            .sort({ "snapshots.users": -1 })
            .limit(limit)
            .toArray()
            .then(products => response.json({products}))
            .catch(err => console.error("Whoopsie! "+err));
    });  
    
    app.get('/api/moversProducts', (request, response) => {        
        var limit = Math.min(100, request.query.limit ? parseInt(request.query.limit) : 10);

        
           db.collection("products")
            .find({ $where: "this.snapshots.length > 1" })
            .limit(limit)
            .toArray()
            .then(products => response.json({products}))
            .catch(err => console.error("Whoopsie! "+err));
    });  
    
    app.get('*', (request, response) => {
        response.render('pages/index');
    });

    app.listen(app.get('port'), function() {
        console.log('Node app is running on port', app.get('port'), app.get('env'));
    });

})
