var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  console.log('in users.js')
  res.send('in users.js --- respond with a resource');
});

module.exports = router;
