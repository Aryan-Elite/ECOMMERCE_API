const Cart = require("../Models/cartModel");
const { findOne } = require("../Models/userModel");
const AppError = require("../utils/appError");
exports.createCart = async (req, res, next) => {
  const newCart = new Cart(req.body);
  try {
    const savedCart = await newCart.save();
    res.status(200).json({
      status: "success",
      data: {
        savedCart,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "failed",
      message: err.message,
    });
  }
};
exports.updateCart = async (req, res, next) => {
  const cart = req.params.id;
  try {
    if (!cart) return next(new Error(`No cart found with this id `, 404));
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({
      status: "success",
      data: {
        updatedCart,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "failed",
      message: err.message,
    });
  }
};
exports.deleteCart = async (req, res, next) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "success",
      message: "Cart deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      status: "failed",
      message: err.message,
    });
  }
};

exports.getUserCart = async (req, res, next) => {
  try {
    const cart = await Cart.find({ userId: req.params.userId });
    if (!cart) return next(new Error(`No user cart found with that id`, 404));
    res.status(200).json({
      status: "success",
      data: {
        cart,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "failed",
      message: err.message,
    });
  }
};
exports.getAllCart = async (req, res, next) => {
  try {
    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (err) {
    res.status(500).json(err);
  }
};
