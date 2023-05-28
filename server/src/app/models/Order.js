const mongoose = require('mongoose'); 

const Schema = mongoose.Schema;

const products = new Schema({
    nameprod: {
        type: String,
    },

    quantity: {
        type: Number,
    },

    price: {
        type: Number,
    },

    id: {
        type: String,
    }

});

const Order = new Schema(
    {

        product: {
            type: [
                products
            ]
        },

        username: 
        {
            type: String
        }, 

        status: {
            type: String,
            default: "Chưa xác nhận"
        },

        patdAt: {
            type: Date
        },

        totalPrice: {
            type: Number,
            default: 0,
        },

        deliveredAt: {
            type: Date
        },

        createdAt: {
            type: Date,
            default: Date.now
        }
    },

    {
        versionKey: false,
        collection: 'orders',
        timestamps: true,
    }

);




module.exports = mongoose.model('orders', Order);