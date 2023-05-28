const jwt = require("jsonwebtoken");
const Account = require("../models/Account");
// const GooglePlusTokenStrategy = require('passport-google-plus-token');
// const { Strategy: GoogleStrategy } = require('passport-google-oauth20');
//const passport = require("passport");

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

// passport.use(
//     new GoogleStrategy(
//       {
//         clientID: '113981226682-vk1qqh65b4d0j2l5ag62k455s69dvkes.apps.googleusercontent.com',
//         clientSecret: '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',
//         callbackURL: '/login/google/callback',
//         passReqToCallback: true
//       },
//       async (req, accessToken, refreshToken, profile, done) => {
//         try {
//           const user = await Account.findOne({ 'google.id': profile.id });

//           if (user) {
//             // Nếu người dùng đã đăng ký, tạo token JWT bằng thông tin user và secret của bạn
//             const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
//             return done(null, { token });
//           }

//           // Nếu hiện tại người dùng chưa đăng ký, tạo tài khoản mới
//           const newUser = new Account({
//             method: 'google',
//             google: {
//               id: profile.id,
//               email: profile.emails[0].value,
//               name: profile.displayName
//             }
//           });
//           await newUser.save();

//           // Tạo token JWT và trả về phản hồi.
//           const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
//           return done(null, { token });
//         } catch (error) {
//           return done(error, null);
//         }
//       }
//     )
//   );

module.exports = {
  AuthenticationAccount,
};
