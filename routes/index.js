var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/user', function(req, res) {
  res.status(200).json('User Saved!');
});

router.post('/food', function(req, res) {
  res.status(200).json('Food Saved!');
});

module.exports = router;
