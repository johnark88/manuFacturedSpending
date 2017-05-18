var router = require('express').Router();
var path = require('path');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

//mongodb connection
var url = 'mongodb://localhost:27017/mstrackingapp';
router.post('/', function(req, res) {
  console.log('/newUser here');
  console.log(req.body, 'req');
  var newGiftCard = 
  // Use connect method to connect to the server
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    // Insert a single document
    db.collection('batman').insertOne({
      a: 1
    }, function(err, r) {
      assert.equal(null, err);
      assert.equal(1, r.insertedCount);


      db.collection('inserts').insertMany([{
        a: 2
      }, {
        a: 3
      }], function(err, r) {
        assert.equal(null, err);
        assert.equal(2, r.insertedCount);

        db.close();

        res.send('Got a POST request at /user');
      }); //end mongo connect
    });
  });
});


module.exports = router;
