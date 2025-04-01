const mongoose = require("mongoose");
const generate = require("../helpers/generate");
const orderSchema = new mongoose.Schema({
    user_id : String,
    cart_id :String,
    accept : {
        type : Boolean,
        default : false
    },
    orderCode : {
        type : String,
        default : "CNW" + generate.generateRandomString(10)
    },
    userInfo : {
        fullName : String,
        phone : String,
        address : String
    },
    products : [
        {
            product_id : String,
            price : Number,
            discountPercentage : Number,
            quantity : Number
        }
    ]
},{ timestamps: true });

const Order = mongoose.model('Order', orderSchema, "orders");

module.exports = Order;