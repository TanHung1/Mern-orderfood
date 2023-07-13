const express = require("express");
const router = express.Router();
const passport = require("passport");
const { AuthenticationAccount, checkRole } = require("../app/middleware/Authentication");
const { register, login, updateAccount, loginWithFacebook } = require("../app/controllers/AccountControllers");

router.post("/register", register);
router.post("/login", login);
// router.post(
//   "/auth/google",
//   passport.authenticate("google-plus-token"),
//   AccountControllers.authGoogle
// );
router.post("/login/facebook", loginWithFacebook);


router.put(
  "/:id/update-account",
  AuthenticationAccount,
  updateAccount
);

module.exports = router;
