const express = require("express");
const AccountControllers = require("../app/controllers/AccountControllers");
const router = express.Router();
const passport = require("passport");
// const passportConfig = require('../middleware/passport');

router.post("/register", AccountControllers.register);
router.post("/login", AccountControllers.login);
// router.post('/login/google', AccountControllers.loginGoogle);
// router.post(
//     '/login/google',
//     passport.authenticate('google', {
//       scope: ['profile', 'email']
//     })
//   );

//   router.post('/login/google/callback', passport.authenticate('google', { session: false }), (req, res) => {
//     res.json(req.user);
//   });
router.post("/update-account", AccountControllers.updateAccount);

module.exports = router;
