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

    // pagination 
    let objectPagination = {
        currentPage : 1,
        limitItem : 4,
    }

    if(req.query.page){
        objectPagination.currentPage = parseInt(req.query.page);
    }

    objectPagination.skip = (objectPagination.currentPage - 1) * objectPagination.limitItem;

    // lấy ra số lượng sản phẩm đang có trong db
    const countProducts =  await Products.countDocuments(find);
    const totalPage = Math.ceil(countProducts / objectPagination.limitItem);
    objectPagination.totalPage = totalPage;
    // end pagination 


    const products = await Products.find(find)
                            .limit(objectPagination.limitItem)
                            .skip(objectPagination.skip);

    // console.log(products);
    res.render('admin/pages/products/index', {
        pageTitle : "Trang chủ",
        products : products,
        filterStatus : filterStatus,
        keyword : objectSearch.keyword,
        objectPagination : objectPagination
    });
}