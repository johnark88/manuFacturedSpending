var router = require('express').Router();
var path = require('path');
var admin = require("firebase-admin");

var serviceAccount = require("./server/serviceAccountKey.json");
console.log('firebase route');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://mstrackingapp.firebaseio.com"
});


module.exports = router;
