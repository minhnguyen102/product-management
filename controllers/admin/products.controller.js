const Products = require("../../model/products.model");
const filterStatusHelper = require("../../helpers/filterStatus");
const SearchHelper = require("../../helpers/search");
const paginationHelper = require("../../helpers/pagination");

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

    // Pagination 
    // lấy ra số lượng sản phẩm đang có trong db
    const countProducts =  await Products.countDocuments(find);

    let objectPagination = paginationHelper(
        {
        currentPage : 1,
        limitItem : 4, // mục đích truyèn thế này để sau này khi ứng dụng vào các trang khác, số lượng không limitItem có thể thay đổi, lúc đó ta có thể truyền vào thay vì điền cứng là 4
        },
        req.query,
        countProducts
    )
    // End pagination 


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