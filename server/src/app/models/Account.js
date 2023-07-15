const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const Schema = mongoose.Schema;

const Account = new Schema(
  {

    username: {
      type: String,
      require: true,
    },

    phonenumber: {
      type: String,  
      default: null
    },

    email: {
      type: String,

    },

    password: {
      type: String,
    },

    avatar: {
      type: String
    }, 
    
    authGoogleID: {
      type: String,
      default: null,
    },
    authFacebookID: {
      type: String,
      default: null,
    },

    loginType: {
      type: String,
      enum: ["local", "google", "facebook"],
      default: "local",
    },

    address: {
      type: String,
    },

    role: {
      type: String,
      default: "customer",
    },
  },

  {
    versionKey: false,
    collection: "accounts",
    timestamps: true,
  }
);

Account.plugin(mongooseDelete, { overrideMethods: "all" });

module.exports = mongoose.model("accounts", Account);
