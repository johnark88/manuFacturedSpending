var router = require('express').Router();
var path = require('path');
var admin = require("firebase-admin");

// Fetch the service account key JSON file contents
var serviceAccount = require('./serviceAccountKey.json');
// Initialize the app with a service account, granting admin privileges
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://mstrackingapp.firebaseio.com"
});


module.exports = router;
