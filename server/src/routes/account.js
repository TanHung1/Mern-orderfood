const express = require("express");
const AccountControllers = require("../app/controllers/AccountControllers");
const router = express.Router();

const passport = require("passport");
// const passportConfig = require('../middleware/passport');

router.post("/register", AccountControllers.register);
router.post("/login", AccountControllers.login);
router.post(
  "/auth/google",
  passport.authenticate("google-plus-token"),
  AccountControllers.authGoogle
);
router.post("/:id/update-account", AccountControllers.updateAccount);

module.exports = router;
