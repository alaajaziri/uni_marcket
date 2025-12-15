var express = require('express');
var router = express.Router();
var { getAllProducts, addProduct, getProductById, deleteProduct } = require('../controllers/productController');


router.get('/', getAllProducts);
router.post('/', addProduct);
router.get('/:id', getProductById);
router.delete('/:id', deleteProduct);


module.exports = router;