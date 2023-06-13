const express = require("express");
const AccountControllers = require("../app/controllers/AccountControllers");
const router = express.Router();
const passport = require("passport");
const { AuthenticationAccount } = require("../app/middleware/Authentication");

router.post("/register", AccountControllers.register);
router.post("/login", AccountControllers.login);
// router.post(
//   "/auth/google",
//   passport.authenticate("google-plus-token"),
//   AccountControllers.authGoogle
// );
router.put(
  "/:id/update-account",
  AuthenticationAccount,
  AccountControllers.updateAccount
);

module.exports = router;
