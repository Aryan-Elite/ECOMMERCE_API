const User = require("../Models/userModel");
const Product = require("../Models/productModel");
const AppError = require("../utils/appError");

exports.createProduct = async (req, res, next) => {
  const newProduct = new Product(req.body);
  try {
    const savedProduct = await newProduct.save();
    res.status(200).json({
      status: "success",
      data: {
        savedProduct,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "failed",
      message: err.message,
    });
  }
};
exports.updateProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!id) return next(new AppError(`No Product found with this id`, 404));
    const updatedproduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true } //make a new document
    );
    res.status(200).json({
      status: "success",
      data: {
        updatedproduct,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "failed",
      message: err.message,
    });
  }
};
exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return next(new AppError(`Please provide a valid id`, 404));
    res.status(200).json({
      status: "success",
      message: "Product has been deleted...",
    });
  } catch (err) {
    res.status(500).json({
      status: "failed",
      message: err.message,
    });
  }
};
exports.getProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return next(new AppError(`No product found with that id`, 404));
    }
    res.status(200).json({
      status: "success",
      data: {
        product,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "failed",
      message: err.message,
    });
  }
};
exports.getAllProduct = async (req, res, next) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let products;

    if (qNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(5);
    } else if (qCategory) {
      products = await Product.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else {
      products = await Product.find();
    }

    res.status(200).json({
      status: "success",
      data: products,
    });
  } catch (err) {
    res.status(500).json({
      status: "failed",
      message: err.message,
    });
  }
};
