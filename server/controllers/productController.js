const Product = require("../models/product");
const User = require("../models/user");



async function getAllProducts(req, res, next) {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    next(err);
  }
};

async function addProduct(req, res) {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = req.user;

    const product = new Product({
      ...req.body,
      userId: user._id,
    });

    await product.save();
    res.status(201).json(product);
  } catch (err) {
    console.error("ADD PRODUCT ERROR:", err);
    res.status(500).json({ message: err.message });
  }
}

async function getProductById(req, res, next) {
  try {
    const id = req.params.id;
    const product = await Product.findById(id).populate("userId");
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Create a response object with fresh seller info from the user
    const productResponse = product.toObject();

    if (product.userId && product.userId.seller) {
      productResponse.seller = {
        name: product.userId.seller.name,
        university: product.userId.seller.university,
        contact: product.userId.seller.contact
      };
    }

    res.json(productResponse);
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
