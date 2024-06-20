const router = require("express").Router();
const express = require("express");
const authController = require("../controllers/authController");
const productController = require("../controllers/productController");
router.get(
  "/",
  authController.verifyTokenAndAdmin,
  productController.getAllProduct
);
router.post(
  "/createProduct",
  authController.verifyTokenAndAdmin,
  productController.createProduct
);
router
  .route("/:id")
  .patch(authController.verifyTokenAndAdmin, productController.updateProduct)
  .delete(authController.verifyTokenAndAdmin, productController.deleteProduct)
  .get(authController.verifyTokenAndAdmin, productController.getProduct);

module.exports = router;
