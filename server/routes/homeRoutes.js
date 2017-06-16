var router = require('express').Router();
var path = require('path');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

//mongodb connection
var url = 'mongodb://localhost:27017/mstrackingapp';

//post route
router.post('/', function(req, res) {
  var newGiftCard = req.body;
  console.log(newGiftCard, 'newwwwwww');
  // Use connect method to connect to the server
  MongoClient.connect(url, function(err, db) {
    if (err) {
      console.log(err);
    }

    console.log("Connected successfully to server");

    // Insert a new gift card
    // need to figure out a unique id for each
    // and properties to object - such as ID # or giftCard1, giftCard2  etc
    db.collection('gift-cards').insertOne({
      //connect to db collection gift-cards
      // insert new gift card from current user
      newGiftCard
    }, function(err, r) {
      console.log(r, 'RRRR');
      console.log(r.result, 'r.result');
      //close connection to db
      db.close();
      res.send(r);
    }); //end mongo connect
  }); // end mongo client
}); //end router . post


module.exports = router;
