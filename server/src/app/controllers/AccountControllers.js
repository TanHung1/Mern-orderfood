const Account = require("../models/Account");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//[post] api/account/register

register = async (req, res, next) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPasword = await bcrypt.hash(req.body.password, salt);
    const { username, phonenumber, email, role, password } = req.body;

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
  let user;

  if (/^\d+$/.test(identifier)) {
    user = await Account.findOne({ phonenumber: identifier });
  } else {
    user = await Account.findOne({ email: identifier });
  }

  if (!user) {
    return res.status(403).json({ error: "Email hoặc số điện thoại sai" });
  }

  const vallidPassword = await bcrypt.compare(req.body.password, user.password);

  if (!vallidPassword) {
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
      const result = await newAccount.save();
      const token = jwt.sign(
        { userId: result._id },
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
  updateAccount,
};
