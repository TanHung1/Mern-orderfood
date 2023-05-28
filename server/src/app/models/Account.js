const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const Account = new Schema(
    {
        fullname:{
            type: String,
        },

        username: {
            type: String,
            require: true
        },

        fullname: {
            type: String,
        },
        
        phonenumber: {
            type: String,
            require: true,
            unique : true,
        },

        email: {
            type: String,
            require: true,
            unique: true,
        },

        password: {
            type: String
        },

        loginType: {
            type: String,
            enum: ['local', 'google', 'facebook'],
            default: 'local',
        },

        sex: {
            type: String
        },

        dob: {
            type: Date
        },

        address: {
            type: String
        },

        role: {
            type: String,
            default: 'customer'
        }
    },

    { 
        versionKey: false,
        collection: "accounts",
        timestamps: true,
    }
);

Account.plugin(mongooseDelete, {overrideMethods: 'all'});

module.exports = mongoose.model('accounts', Account);