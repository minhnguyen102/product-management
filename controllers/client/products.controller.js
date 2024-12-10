const Product = require('../../model/products.model');
const productsCategory = require('../../model/products-category.model');
const productsHellper = require("../../helpers/products")
const productsCategoryHellper = require("../../helpers/produtcs-category")

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

// [GET] /products/deatil/:slugProduct
module.exports.detail = async (req, res) => {
    // console.log(req.params)

    try {
        const find = {
            status: "active",
            slug : req.params.slugProduct,
            deleted : false
        }
        const product = await Product.findOne(find)

        product.priceNew = productsHellper.priceNew(product)   

        // console.log(product)
        res.render('client/pages/products/detail', {
            pageTitle : product.title,
            product : product
        });
    } catch (error) {
        res.ridirect(`/products`)
    }
}


// [GET] /products/:slugCategory
module.exports.category = async (req, res) =>{
    // console.log(req.params.slugCategory);
    const productCategory = await productsCategory.findOne({
        slug : req.params.slugCategory,
        status : "active",
        deleted : false
    })
    // console.log(productCategory.id);

    const listCategory = await productsCategoryHellper.getSubCategory(productCategory.id);

    const listCategoryId = listCategory.map(item => item.id);
    console.log(productCategory.id);
    console.log(listCategoryId);


    const products = await Product.find({
        product_category_id : { $in : [productCategory.id, ...listCategoryId]},
        deleted : false,
        status : "active"
    }).sort({position : "desc"});

    const newProducts = productsHellper.priceNewProduct(products);

    res.render('client/pages/products/index', {
        pageTitle : productCategory.title,
        products : newProducts
    });
}
