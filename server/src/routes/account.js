const express = require("express");
const router = express.Router();
const passport = require("passport");
const { AuthenticationAccount, checkRole } = require("../app/middleware/Authentication");
const { checkvalidata } = require("../app/middleware/check");
const { register, login, updateAccount } = require("../app/controllers/AccountControllers");

router.post("/register", register);
router.post("/login", login);
// router.post(
//   "/auth/google",
//   passport.authenticate("google-plus-token"),
//   AccountControllers.authGoogle
// );
router.put(
  "/:id/update-account",
  AuthenticationAccount,
  updateAccount
);

module.exports = router;
