var express = require('express');
var router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });


var mongoose = require("mongoose"),
  Schema = mongoose.Schema;

/************************************************************
 * The userSchema which is used to generate the Model
 *************************************************************/


var userSchema = mongoose.Schema({
  institute: String,
  name: String,
  sName: String,
  fname: String,
  email: String,
  femail: String,
  mobile: Number,
  sMobile: Number,
  games: [String],
  ggames: [String]
});

var user = mongoose.model('User', userSchema);

router.post('/insert', function(req, res, next) {
	console.log(req.body);
  user.create(req.body, function(err, newUser) {
    if (err) {
      console.log(err);
    } else {
      res.send({ "status": "OK" });
    }
  });
});

router.get('/fetch', function(req, res, next) {
  user.find()
    .exec(function(err, result) {
      res.render('index',{result: result, title : "Data"});
      // res.send(result);
    });
});


module.exports = router;
