const express = require("express");
const AuthController = require("../../../controllers/Auth/AuthController");
const TokenController = require("../../../controllers/Token/TokenController");
const GoogleAuthController = require("../../../controllers/Auth/GoogleAuthController");
const MiddlewareController = require("../../../controllers/Auth/MiddlewareController");

const router = express.Router();

router.route("/login").post(AuthController.login);

router.route("/register").post(AuthController.register);

router.route("/verify-otp").post(AuthController.verifyOTP);

router.route("/google").post(GoogleAuthController.handleGoogleSignIn);

router.route("/refresh").post(TokenController.requestRefreshToken);

router.route("/logout").get(MiddlewareController.verifyToken, AuthController.logout);

module.exports = router;