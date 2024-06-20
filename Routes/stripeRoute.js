const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController"); // Assuming you have a file for authentication
const stripeController = require("../controllers/stripeController");

router.post(
  "/payment",
  authController.verifyTokenAndAuthorization,
  stripeController.handlePayment
);

module.exports = router;
