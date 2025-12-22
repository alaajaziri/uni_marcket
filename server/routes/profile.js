var express = require('express');
var router = express.Router();
var { getUserProducts } = require('../controllers/profileController');
const requireAuth = require('../middleware/requireAuth');

router.get('/', requireAuth, getUserProducts);

module.exports = router;
