const jwt = require("jsonwebtoken");
const Account = require("../models/Account");
const GooglePlusTokenStrategy = require("passport-google-plus-token");
const passport = require("passport");
const dotenv = require("dotenv");
dotenv.config();
const AuthenticationAccount = async (req, res, next) => {
  const authHeader = req.header("Authorization");
  const accessToken = authHeader && authHeader.split(" ")[1];
  if (!accessToken) {
    return res.status(403).json("Token không tồn tại");
  }
  try {
    const decodedToken = jwt.verify(accessToken, process.env.jwt_access_token);
    const user = await Account.findOne({ _id: decodedToken.userId });

    if (!user) {
      return res.status(403).json("Không tìm thấy người dùng");
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
};

const checkRole = (role) => {
  return (req, res, next) => {
    if (req.user.role === role) {
      next();
    } else {
      res.status(403).send("Bạn không có quyền truy cập vào tài nguyên này");
    }
  };
};
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(
  new GooglePlusTokenStrategy(
    {
      clientID:"113981226682-qfqqlm0hs2ur8j9o7oj6du7sak3t4p0l.apps.googleusercontent.com",
      clientSecret: "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",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log("accessToken: " , accessToken);
        console.log("refreshToken: ", refreshToken);
        console.log("profile: " , profile);

        const user = await Account.findOne({
          loginType: "google",
          authGoogleID: profile.id,
        });

        if (user) {
          return done(null, user);
        }

        if(!user)
        {
          const newAccount = new Account({
            loginType: "google",
            email: profile.emails[0].value,
            authGoogleID: profile.id,
          });
          await newAccount.save();
          done(newAccount);
        }
      } catch (error) {
        console.log(error);
      }
    }
  )
);

module.exports = {
  AuthenticationAccount,
  checkRole,
};
