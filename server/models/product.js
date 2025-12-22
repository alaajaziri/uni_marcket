const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: String,
  userId: mongoose.Schema.Types.ObjectId,
  price: Number,
  images: [String],
  description: String,
  category: String,
  condition: String,
  quantity: Number,
  isSold: Boolean,
  seller: {
    name: String,
    university: String,
    contact: String
  },
  location: String,
  tags: [String],
  rating: Number,
  postedAt: Date
});

module.exports = mongoose.model("Product", productSchema);
