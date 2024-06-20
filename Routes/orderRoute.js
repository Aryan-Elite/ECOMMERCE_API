const router = require("express").Router();
const express = require("express");
const authController = require("../controllers/authController");
const orderController = require("../controllers/orderController");
router.post(
  "/createOrder",
  authController.verifyToken,
  orderController.createOrder
);
router
  .route("/")
  .get(authController.verifyTokenAndAdmin, orderController.getAllOrder);
router
  .route("/:id")
  .patch(authController.verifyTokenAndAdmin, orderController.updateOrder)
  .delete(authController.verifyTokenAndAdmin, orderController.deleteOrder);

router.get(
  "/find/:userId",
  authController.verifyTokenAndAdmin,
  orderController.getUserOrder
);
router.get(
  "/monthly",
  authController.verifyTokenAndAdmin,
  orderController.getMonthly
);

module.exports = router;
