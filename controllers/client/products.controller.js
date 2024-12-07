const Product = require('../../model/products.model');
const productsHellper = require("../../helpers/products")

// [GET] /products
module.exports.index = async (req, res) => {
    const products = await Product.find({
        status: "active",
    })
    .sort({position : "desc"});

    const newProducts = productsHellper.priceNewProduct(products)

    res.render('client/pages/products/index', {
        pageTitle : "Trang sản phẩm",
        products : newProducts
    });
}

// [GET] /products/:slug
module.exports.detail = async (req, res) => {
    // console.log(req.params)

    try {
        const find = {
            status: "active",
            slug : req.params.slug,
            deleted : false
        }
        const product = await Product.findOne(find)
        console.log(product)
        res.render('client/pages/products/detail', {
            pageTitle : product.title,
            product : product
        });
    } catch (error) {
        res.ridirect(`/products`)
    }
}