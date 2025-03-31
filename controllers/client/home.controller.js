const Product = require('../../model/products.model');
const Cart = require('../../model/cart.model');
const productsHellper = require("../../helpers/products")
// [GET] /
module.exports.index = async (req, res) => {
    // lấy ra sản phẩm nổi bật
    let find = {
        deleted : false,
        featured : "1",
        status : "active"
    }
    const productsFeatured = await Product.find(find).limit(6);
    const newProductsFeatured = productsHellper.priceNewProduct(productsFeatured);
    // end lấy ra sản phẩm nổi bật

    const productsNew = await Product.find({
        deleted : false,
        status : "active"
    }).sort({position : "desc"}).limit(6)
    const newProductsNew = productsHellper.priceNewProduct(productsNew);


    // const cartId = req.cookies.cartId;
    // console.log(cartId)
    // const cart = await Cart.findOne({
    //     _id : cartId
    // })
    // cart.totalQuantity = cart.products.reduce((sum, item) => sum + item.quantity, 0) // thêm biến totalQuantity vào object cart
    // console.log(cart.totalQuantity)

    res.render('client/pages/home/index', {
        pageTitle : "Trang chủ",
        productsFeatured : newProductsFeatured,
        productsNew : newProductsNew,
        // cart : cart.totalQuantity
    });
}