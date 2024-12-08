const Product = require('../../model/products.model');
const productsHelper = require("../../helpers/products")

// [GET] /search
module.exports.index = async (req, res) => {
    const keyword = req.query.keyword;
    // console.log(keyword);
    let newProducts = []

    if(keyword) {
        const keywordRegex = new RegExp(keyword, "i");
        const products = await Product.find({
            title : keywordRegex,
            status : "active",
            deleted: false
        })

        newProducts = productsHelper.priceNewProduct(products)
        console.log(newProducts)
    }

    res.render("client/pages/search/index", {
        pageTitle : "Trang kết quả tìm kiếm",
        keyword : keyword,
        products : newProducts
    }) 
}