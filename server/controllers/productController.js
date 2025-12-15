const Product = require("../models/product");

async function getAllProducts(req, res) {
  const products = await Product.find();
  res.json(products);
};

async function addProduct(req, res) {
  const newProd = req.body;
  const product = new Product(newProd);
  await product.save();
  res.json(product);
};

async function getProductById(req, res) {
  const id = req.params.id;
  const product = await Product.findById(id);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  res.json(product);
}

async function deleteProduct(req, res) {
  const id = req.params.id;
  const product = await Product.findByIdAndDelete(id);
  res.json(product);
}

module.exports = { getAllProducts, addProduct, getProductById, deleteProduct };
