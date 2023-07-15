const jwt = require("jsonwebtoken");
const Account = require("../models/Account");
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
    console.log(error);
    return res.status(500).send(error);
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

module.exports = {
  AuthenticationAccount,
  checkRole,
};
