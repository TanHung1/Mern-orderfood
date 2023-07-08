const Account = require("../models/Account");
const checkvalidata = async (res,req,next) =>{
  try {
    const check = ""
    const {
        // phonenumber,
        email,        
      } = req.body;
  
    // const phonenumberExists = await Account.find(phonenumber)
    const emailExists = await Account.find({email: email});
    // if(phonenumberExists)
    // {
    //   check =  res.status(403).json({ error: "Số điện thoại đã tồn tại"})
    // }else 
    if(emailExists){
       check = res.status(403).json({ error: "Email đã tồn tại" })
    }
    console.log(req.body)
    return check
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
    checkvalidata
}