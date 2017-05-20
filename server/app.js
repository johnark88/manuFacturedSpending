require('dotenv').config(); // Imports all .env values
var path = require('path');
var express = require('express');
var app = express();
var admin = require("firebase-admin");
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({
    extended: false
});
var portDecision = process.env.PORT || 8081;
//use public folder
app.use(express.static(path.resolve('public')));
//lib files
app.use('/inc', express.static(path.resolve('./node_modules/angular')));
app.use('/inc', express.static(path.resolve('./node_modules/angular-ui-router/release')));
app.use('/inc', express.static(path.resolve('./node_modules/jquery/dist')));
app.use('/inc', express.static(path.resolve('./node_modules/moment/min')));
//.json body parser
app.use(bodyParser.json());

//server routes
var homeRoutes = require('./routes/homeRoutes');
app.use('/newGiftCard', homeRoutes);

//firebase-admin
var firebase = require('./routes/firebase');
app.use(firebase);

//listen and port decision
app.listen(portDecision, function() {
    console.log('listening on', portDecision);
}); //end app.listen
