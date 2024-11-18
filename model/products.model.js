const mongoose = require("mongoose");
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);

const productSchema = new mongoose.Schema({
    title: String,
    product_category_id : {
        type : String,
        default : ""
    },
    slug: {
        type: String,
        slug: "title",
        unique: true // tránh trùng slug
    },
    createBy : {
        account_id : String,
        createAt : {
            type : Date,
            default : Date.now
        }
    },
    description: String,
    price: Number,
    discountPercentage: Number,
    stock: Number,
    thumbnail: String,
    status: String,
    position: Number,
    deleted: {
        type : Boolean,
        default : false
    },
    // deletedAt : Date
    deleteBy : {
        account_id : String,
        deleteAt : Date
    }
},{ timestamps: true });

const Product = mongoose.model('Product', productSchema, "products");

module.exports = Product;