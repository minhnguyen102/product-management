// [GET] /admim/products

const Products = require("../../model/products.model");

module.exports.index = async (req, res) => {
    const products = await Products.find({
        deleted: false
    })

    console.log(products);

    res.render('admin/pages/products/index', {
        pageTitle : "Trang chủ",
        products : products
    });
}