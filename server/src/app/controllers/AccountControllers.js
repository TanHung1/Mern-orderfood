const Account = require("../models/Account");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

class AccountControler {
  //[post] api/account/register
  register = async (req, res, next) => {
    try {
      if (this.loginType !== "local") next();
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

<<<<<<< HEAD
      if (user && vallidPassword) {
        res.status(200).json({ token, user });
      }
    } catch (error) {
      res.status(500).json(error);
      console.log(error);
=======
            const token = jwt.sign(
                { userId: user._id },
                process.env.jwt_access_token,
                { expiresIn: "48h" }
            );

            if (user && vallidPassword) {
                res.status(200).json({ token, user })
            }

        } catch (error) {
            res.status(500).json(error)
            console.log(error)
        }

    };

    //[post] /api/account/auth/google
    authGoogle = async (req, res) =>{
        console.log('auth google', req.user)
        // const token = encodedToken(req.user._id)
        // console.log(token)
        // res.setHeader('Authorization', token);
        // return res.status(200).json({success: true})
>>>>>>> 1361d9c672cacb1c8fc2b9e8c1b306d07a935cc3
    }
  };

  //[post] /api/account/auth/google
  authGoogle = async (req, res) => {
    const token = encodedToken(req.user._id);
    console.log(token);
    res.setHeader("Authorization", token);
    return res.status(200).json({ success: true });
  };

  //[put] api/account/:id/update-account
  updateAccount(req, res) {
    Account.updateOne({ _id: req.params.id }, req.body)
      .then(() => res.status(200).send("oke"))
      .catch((err) => res.status(500).json(err));
  }
}

module.exports = new AccountControler();
