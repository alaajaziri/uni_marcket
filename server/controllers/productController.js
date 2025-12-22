const Product = require("../models/product");
const User = require("../models/user");

async function getUserProducts(req, res, next) {
  try {
    const firebaseUid = req.user.uid;

    // Get user info
    const user = await User.findOne({ firebaseUid });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Get products linked to this user
    const products = await Product.find({ userId: user._id });

    res.json({ user: user.seller, products });
  } catch (err) {
    next(err);
  }
}

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
    const firebaseUid = req.user.uid;
    const user = await User.findOne({ firebaseUid });
    if (!user) return res.status(404).json({ message: "User not found" });

    const newProd = req.body;
    const product = new Product({ ...newProd, userId: user._id });
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

module.exports = { getAllProducts, addProduct, getProductById, deleteProduct, getUserProducts };
