const Products = require("../../model/products.model");
const filterStatusHelper = require("../../helpers/filterStatus");
const SearchHelper = require("../../helpers/search");

// [GET] /admim/products
module.exports.index = async (req, res) => {
    // console.log(req.query.page);
    // filterStatus
    const filterStatus = filterStatusHelper(req.query);
    // console.log(filterStatus);

    let find = {
        deleted: false
    }
    // nếu có status thì mới thựuc hiện 
    if(req.query.status){
        find.status = req.query.status
    }
    

    const objectSearch = SearchHelper(req.query);
    if(objectSearch.regex){
        find.title = objectSearch.regex;
    }

    // end pagination

    const products = await Products.find(find);
    // console.log(products);
    res.render('admin/pages/products/index', {
        pageTitle : "Trang chủ",
        products : products,
        filterStatus : filterStatus,
        keyword : objectSearch.keyword
    });
}