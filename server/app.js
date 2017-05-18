require('dotenv').config(); // Imports all .env values
var path = require('path');
var express = require('express');
var app = express();

var admin = require("firebase-admin");
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({
    extended: false
});
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
app.use('/newUsr', homeRoutes);

//listen and port decision
app.listen(process.env.PORT, function() {
    console.log('listening on', process.env.PORT || 5005);
}); //end app.listen
