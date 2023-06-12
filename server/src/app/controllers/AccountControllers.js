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
      return res.status(200);
    } catch (error) {
      return res.status(500).json(error);
      console.log(error);
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
      return res.status(403).json({error:"Sai thông tin đăng nhập"});
    }
  
    const vallidPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
  
    if (!vallidPassword) {
      return res.status(403).json({error:"Sai mật khẩu"});
    }
  
    const token = jwt.sign(
      { userId: user._id },
      process.env.jwt_access_token,
      { expiresIn: "48h" }
    );
  
    res.status(200).json({success:"dang nhap thanh cong", token, user});
  };
  // login = async (req, res, next) => {
  //   try {
  //     const user = await Account.findOne({ email: req.body.email });

  //     if (!user) {
  //       return res.status(403).json("Sai email");
  //     }
  //     const vallidPassword = await bcrypt.compare(
  //       req.body.password,
  //       user.password
  //     );

  //     if (!vallidPassword) {
  //       return res.status(403).json("Sai mật khẩu");
  //     }

  //     const token = jwt.sign(
  //       { userId: user._id },
  //       process.env.jwt_access_token,
  //       { expiresIn: "48h" }
  //     );

  //     if (user && vallidPassword) {
  //       return res.status(200).json({ token, user });
  //     }
  //   } catch (error) {
  //     return res.status(500).json(error)
  //     // console.log(error)
  //   }
  // };
  
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
      .then(()=>{
        let user= req.body;
        const token = jwt.sign(
          { userId: user._id },
          process.env.jwt_access_token,
          { expiresIn: "48h" }
        )
        res.status(200).json({message: 'Access token', token})
      })
      
      .catch((err) => res.status(500).json(err));
  }
}

module.exports = new AccountControler();
