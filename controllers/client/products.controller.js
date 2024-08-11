const Product = require('../../model/products.model');


// [GET] /products
module.exports.index = async (req, res) => {
    const products = await Product.find({
        status: "active",
    })
    .sort({position : "desc"});

    const newProducts =  products.map((item) => {
        item.newPrice = (item.price - item.price  * (item.discountPercentage / 100)).toFixed(0);
        return item;
    })

    res.render('client/pages/products/index', {
        pageTitle : "Trang sản phẩm",
        products : newProducts
    });
}