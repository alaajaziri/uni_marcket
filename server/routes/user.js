var express = require('express');
var router = express.Router();
var { adduser } = require('../controllers/userController');
router.post('/', adduser);

module.exports = router;