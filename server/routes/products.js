var express = require('express');
var router = express.Router();
const requireAuth = require('../middleware/requireAuth');
var { getAllProducts, addProduct, getProductById, deleteProduct } = require('../controllers/productController');


router.get('/', getAllProducts);

router.post('/', requireAuth, addProduct);
router.delete('/:id', requireAuth, deleteProduct);
router.get('/:id', getProductById);



module.exports = router;