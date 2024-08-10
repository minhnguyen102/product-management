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
        limitItem : 5, // mục đích truyèn thế này để sau này khi ứng dụng vào các trang khác, số lượng không limitItem có thể thay đổi, lúc đó ta có thể truyền vào thay vì điền cứng là 4
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

// [PATCH] /admim/products/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
    // console.log(req.params);
    const status = req.params.status;
    const id = req.params.id;

    await Products.updateOne({_id : id}, {status : status});
    res.redirect('back');
}


// [PATCH] /admim/products/change-multi
module.exports.changeMulti = async (req, res) => {
    // console.log(req.body)
    const type = req.body.type;
    const ids = req.body.ids.split(", ");
    
    // chưa hợp lí
    switch (type){
        case "active":
            await Products.updateMany(
                { _id: { $in: ids } },
                { $set: { status : type } },
            )
            break;
        case "inactive":
            await Products.updateMany(
                { _id: { $in: ids } },
                { $set: { status : type } },
            )
            break
        default:
            break;
    }
    res.redirect('back');
}

// // [DELETE] /admim/products/delete
module.exports.deleteItem = async (req, res) => {
    // console.log(req.body)
    const id = req.params.id;
    
    await Products.deleteOne({_id : id});
    res.redirect('back');
}