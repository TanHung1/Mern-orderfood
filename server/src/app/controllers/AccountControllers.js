const Account = require("../models/Account");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();

//[post] api/account/register

register = async (req, res, next) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPasword = await bcrypt.hash(req.body.password, salt);
    const { username, phonenumber, email, role } = req.body;

    const phonenumberExists = await Account.findOne({
      phonenumber: phonenumber,
    });
    if (phonenumberExists) {
      return res.status(403).json({ error: "Số điện thoại đã tồn tại" });
    }
    const emailExists = await Account.findOne({ email: email });
    if (emailExists) {
      return res.status(403).json({ error: "Email đã tồn tại" });
    }

    const newAccount = new Account({
      username,
      phonenumber,
      email,
      password: hashedPasword,
      role,
    });
    await newAccount.save();
    return res.status(200).json({
      message: "oke",
      Listdata: {
        username: newAccount.username,
        phonenumber: newAccount.phonenumber,
        email: newAccount.email,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
//[post] api/account/login
login = async (req, res, next) => {
  const identifier = req.body.identifier;
  const password = req.body.password;
  let user;

  if (/^\d+$/.test(identifier)) {
    user = await Account.findOne({ phonenumber: identifier });
  } else {
    user = await Account.findOne({ email: identifier });
  }

  if (!user) {
    return res.status(403).json({ error: "Email hoặc số điện thoại sai" });
  }

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    return res.status(403).json({ error: "Sai mật khẩu" });
  }

  const token = jwt.sign({ userId: user._id }, process.env.jwt_access_token, {
    expiresIn: "48h",
  });

  res.status(200).json({ token, user });
};

//[post] /api/account/login/facebook
const loginWithFacebook = async (req, res) => {
  const { id, name, avatar } = req.body;
  try {
    const user = await Account.findOne({ authFacebookID: id });
    if (user) {
      const token = jwt.sign(
        { userId: user._id },
        process.env.jwt_access_token,
        { expiresIn: "48h" }
      );
      return res.status(200).json({ token, user });
    } else {
      const newAccount = new Account({
        authFacebookID: id,
        username: name,
        avatar: avatar,
        loginType: "facebook",
      });
      const user = await newAccount.save();
      const token = jwt.sign(
        { userId: user._id },
        process.env.jwt_access_token,
        { expiresIn: "48h" }
      );
      return res.status(200).json({ token, user });
    }
  } catch (error) {
    console.log(error);
  }
};

//[post] /api/account/login/google
const loginWithGoogle = async (req, res) => {
  const { iat, name, email, picture } = req.body;
  try {
    const user = await Account.findOne({ authGoogleID: iat });
    if (user) {
      const token = jwt.sign(
        { userId: user._id },
        process.env.jwt_access_token,
        { expiresIn: "48h" }
      );
      return res.status(200).json({ token, user });
    } else {
      const newAccount = new Account({
        authGoogleID: iat,
        username: name,
        email: email,
        avatar: picture,
        loginType: "google",
      });
      const user = await newAccount.save();
      const token = jwt.sign(
        { userId: user._id },
        process.env.jwt_access_token,
        { expiresIn: "48h" }
      );
      return res.status(200).json({ token, user });
    }
  } catch (error) {
    console.log(error);
  }
};

//[put] api/account/update-account/:id
updateAccount = async (req, res) => {
  try {
    const { phonenumber, email } = req.body;
    console.log(phonenumber, email);
    const accountId = req.params.id;

    const phonenumberExists = await Account.findOne({
      _id: { $ne: accountId },
      phonenumber: phonenumber,
    });
    if (phonenumberExists) {
      return res.status(403).json({ error: "Số điện thoại đã tồn tại" });
    }

    const emailExists = await Account.findOne({
      _id: { $ne: accountId },
      email: email,
    });
    if (emailExists) {
      return res.status(403).json({ error: "Email đã tồn tại" });
    }
    await Account.updateOne({ _id: accountId }, req.body);
    res.status(200).json({ message: "Success" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error" });
  }
};

module.exports = {
  register,
  login,
  loginWithFacebook,
  loginWithGoogle,
  updateAccount,
};
