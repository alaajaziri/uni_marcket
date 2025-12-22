var express = require('express');
var router = express.Router();
var { getAllProducts, addProduct, getProductById, deleteProduct, getUserProducts } = require('../controllers/productController');


router.get('/', getAllProducts);
router.post('/', addProduct);
router.get('/:id', getProductById);
router.delete('/:id', deleteProduct);
router.get('/user/:id', getUserProducts);


module.exports = router;