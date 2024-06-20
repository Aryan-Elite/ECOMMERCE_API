const router = require("express").Router();
const express = require("express");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.route("/").get(userController.getallUsers);
router.get(
  "/getUserStats",
  authController.verifyTokenAndAdmin,
  userController.getUserStats
);
router
  .route("/:id")
  .get(authController.verifyTokenAndAuthorization, userController.getUser)
  .patch(authController.verifyTokenAndAuthorization, userController.update)
  .delete(authController.verifyTokenAndAuthorization, userController.delete);

module.exports = router;
