const Product = require('../../model/products.model');
const productsHellper = require("../../helpers/products")
// [GET] /
module.exports.index = async (req, res) => {
    let find = {
        deleted : false,
        featured : "1",
        status : "active"
    }
    const productsFeatured = await Product.find(find).limit(6);
    const newProductsFeatured = productsHellper.priceNewProduct(productsFeatured);
    // console.log(productsFeatured);

    res.render('client/pages/home/index', {
        pageTitle : "Trang chủ",
        productsFeatured : newProductsFeatured
    });
}