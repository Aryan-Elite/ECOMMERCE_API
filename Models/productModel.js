const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "A product must have a title"],
      unique: true,
    },
    description: {
      type: String,
      required: [true, "A product must have a  description"],
    },
    image: {
      type: String,
      required: [true, "A product must have image"],
    },
    categories: {
      type: Array,
    },
    size: {
      type: Number,
    },
    color: {
      type: String,
    },
    price: {
      type: Number,
      required: [true, "A product must have a price"],
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
