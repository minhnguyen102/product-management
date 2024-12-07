const Product = require('../../model/products.model');
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


    res.render('client/pages/home/index', {
        pageTitle : "Trang chủ",
        productsFeatured : newProductsFeatured,
        productsNew : newProductsNew
    });
}