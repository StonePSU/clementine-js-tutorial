'use strict';

const express = require('express');
var app = express();
var port = process.env.PORT || 8080;
const path = require('path');
const routes = require('./app/routes/index.js');
const mongodb = require('mongodb').MongoClient;
const dbURL = "mongodb://localhost:27017/clementinejs";

mongodb.connect(dbURL, (err, db) => {
    
    if (err) {
        throw new Error("Database failed to connect");
    } else {
        console.log("Mongodb successfully connected on port 27017");
    }

    app.use("*", (req, res, next) => {
       console.log(`Request URL: ${req.url} -- Method: ${req.method}`); 
       next();
    });
    
    app.use("/public", express.static(process.cwd() + "/public"));
    app.use('/controllers', express.static(process.cwd() + '/app/controllers'));
    
    routes(app, db);
    
    // error handling middleware
    app.use((err, req, res, next) => {
       console.log(err.stack);
       res.status(500).send("<h2>Oops! Something went wrong!</h2>");
    });
    
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    })

});