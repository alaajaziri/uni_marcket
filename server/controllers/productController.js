const Product = require("../models/product");

async function getAllProducts(req, res, next) {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    next(err);
  }
};

async function addProduct(req, res, next) {
  try {
    const newProd = req.body;
    const product = new Product(newProd);
    await product.save();
    res.json(product);
  } catch (err) {
    next(err);
  }
};

async function getProductById(req, res, next) {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (err) {
    next(err);
  }
}

async function deleteProduct(req, res, next) {
  try {
    const id = req.params.id;
    const product = await Product.findByIdAndDelete(id);
    res.json(product);
  } catch (err) {
    next(err);
  }
}

module.exports = { getAllProducts, addProduct, getProductById, deleteProduct };
