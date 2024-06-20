const router = require("express").Router();
const express = require("express");
const authController = require("../controllers/authController");
const cartController = require("../controllers/cartController");
router.post(
  "/createCart",
  authController.verifyToken,
  cartController.createCart
);
router
  .route("/:id")
  .patch(authController.verifyTokenAndAuthorization, cartController.updateCart)
  .delete(
    authController.verifyTokenAndAuthorization,
    cartController.deleteCart
  );
router.get(
  "/find/:userId",
  authController.verifyTokenAndAuthorization,
  cartController.getUserCart
);
router.get("/", authController.verifyTokenAndAdmin, cartController.getAllCart);
module.exports = router;
