var router = require('express').Router();
var path = require('path');

router.post('/', function(req,res){
console.log('/newUser here');
console.log(req.body, 'REQQQQQ');
res.send('Got a POST request at /user');
});//end router . get


module.exports = router;
