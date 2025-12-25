var express = require('express');
var router = express.Router();
const requireAuth = require('../middleware/requireAuth');
var { getAllProducts, addProduct, getProductById, deleteProduct } = require('../controllers/productController');


router.get('/', getAllProducts);

router.post('/', requireAuth, addProduct);
router.get('/:id', getProductById);
router.delete('/:id', requireAuth, deleteProduct);


module.exports = router;