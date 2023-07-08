const Account = require("../models/Account");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


  //[post] api/account/register

  register = async (req, res, next) => {
    try {      
      const salt = await bcrypt.genSalt(10);
      const hashedPasword = await bcrypt.hash(req.body.password, salt);
      const {
        username,
        phonenumber,
        email,        
        role,
        password
      } = req.body;

      // const phonenumberExists = await Account.findOne({phonenumber})
      const phonenumberExists = await Account.findOne({ phonenumber: phonenumber });
      if (phonenumberExists) {
        return res.status(403).json({ error: "Số điện thoại đã tồn tại" });
      }

       const emailExists = await Account.findOne({email: email});
      if(emailExists){
        return res.status(403).json({ error: "Email đã tồn tại" })
      }
   

      const newAccount = new Account({
        username,
        phonenumber,
        email,
        password: hashedPasword,
        role,
      });
      await newAccount.save();
      return res.status(200).json({message: "oke",Listdata:{username:newAccount.username,phonenumber:newAccount.phonenumber,email:newAccount.email}});

    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  };

  //[post] api/account/login
  login = async (req, res, next) => {
    // if (this.loginType !== "local") next();
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

    const vallidPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!vallidPassword) {
      return res.status(403).json({ error: "Sai mật khẩu" });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.jwt_access_token,
      { expiresIn: "48h" }
    );

    res.status(200).json({ success: "Đăng nhập thành công", token, user });
  };

  //[post] /api/account/auth/google
  authGoogle = async (req, res) => {
    const token = encodedToken(req.user._id);
    console.log(token);
    res.setHeader("Authorization", token);
    return res.status(200).json({ success: true });
  };

  //[put] api/account/update-account/:id
  updateAccount = async (req, res) => {
    try {
      await Account.updateOne({_id: req.params.id}, req.body);
      res.status(200).json({message: "Success"})  
    } catch (error) {
      console.log(error);
      res.status(500).json({message: "Error"})
    }
  }


module.exports = {
  register,
  login,
  updateAccount
};
