const Account = require("../models/Account");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

class AccountControler {
  //[post] api/account/register
  register = async (req, res, next) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const {
        username,
        phonenumber,
        email,
        hashed = await bcrypt.hash(req.body.password, salt),
        role,
      } = req.body;
      const newAccount = new Account({
        username,
        phonenumber,
        email,
        password: hashed,
        role,
      });
      await newAccount.save();
      res.status(200).json(newAccount);
    } catch (error) {
      res.status(500).json(error);
      console.log(error);
    }
  };

  //[post] api/account/login
  login = async (req, res, next) => {
    try {
      const user = await Account.findOne({ email: req.body.email });

      if (!user) {
        res.status(403).json("Sai email");
      }
      const vallidPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if (!vallidPassword) {
        res.status(403).json("Sai mật khẩu");
      }

      const token = jwt.sign(
        { userId: user._id },
        process.env.jwt_access_token,
        { expiresIn: "48h" }
      );
      res.status(200).json({ token, user });
      if (user && vallidPassword) {
      }
    } catch (error) {
      res.status(500).json(error);
      console.log(error);
    }
  };

  //[post] /api/account/login/google
  // loginGoogle = async (req, res) =>{
  //     console.log('auth google', req.user)
  // }

  //[put] api/account/:id/update-account
  updateAccount(req, res) {
    Account.updateOne({ _id: req.params.id }, req.body)
      .then(() => res.status(200).send("oke"))
      .catch((err) => res.status(500).json(err));
  }
}

module.exports = new AccountControler();
