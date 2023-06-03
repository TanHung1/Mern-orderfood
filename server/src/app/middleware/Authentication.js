const jwt = require("jsonwebtoken");
const Account = require("../models/Account");
const GooglePlusTokenStrategy = require('passport-google-plus-token');
const passport = require("passport");
const env = require("dotenv");

const AuthenticationAccount = async (req, res, next) => {
  const authheader = req.header("Authorization");
  const accessToken = authheader && authheader.split(" ")[1];
  if (!accessToken) {
    return res.status(404).send("Token khong ton tai");
  }

  console.log(accessToken);
  try {
    const record = jwt.verify(accessToken, process.env.jwt_access_token);
    const user = await Account.findOne({ _id: record.userId });

    if (!record) {
      return res.status(403).send("Ban khong co quyen truy cap");
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
};



passport.use(new GooglePlusTokenStrategy({
  clientID: "113981226682-vk1qqh65b4d0j2l5ag62k455s69dvkes.apps.googleusercontent.com",
  clientSecret: "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",

}, async (req, res, accessToken, refreshToken, profile, done) => {
  try {
    // console.log('accessToken: ' , accessToken);
    // console.log('refreshToken: ', refreshToken);
    // console.log('profile: ' , profile);

    const user = await Account.findOne({
      loginType: 'google',
      authGoogleID: accessToken.id,

    });

    if (user) return done(null, user);


    const newAccount = new Account({
      loginType: 'google',
      email: accessToken.emails[0].value,
      authGoogleID: accessToken.id,
    })
    await newAccount.save();
    done(null, newAccount);

  } catch (error) {
    console.log(error);
  }
}));

module.exports = {
  AuthenticationAccount,
};
