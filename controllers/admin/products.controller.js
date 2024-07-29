 const Products = require("../../model/products.model");

// [GET] /admim/products
module.exports.index = async (req, res) => {
    // console.log(req.query.status);

    let filterStatus = [
        {
            name : "Tất cả",
            status : "",
            class : ""
        },
        {
            name : "Hoạt động",
            status : "active",
            class : ""
        },
        {
            name : "Dừng họat động",
            status : "inactive",
            class : ""
        }
    ]

    let find = {
        deleted: false
    }
    // nếu có status thì mới thựuc hiện 
    if(req.query.status){
        find.status = req.query.status
    }

    let keyword ="";
    if(req.query.keyword){
        keyword = req.query.keyword;
        const regex = new RegExp(keyword, "i");
        find.title = regex;
    }

    // Tìm ra vị trí button có params hiện tại, xử lí hover
    if(req.query.status){
        const index = filterStatus.findIndex(item => item.status == req.query.status)
        filterStatus[index].class = "active";
    }else{
        const index = filterStatus.findIndex(item => item.status == "")
        filterStatus[index].class = "active";
    }
    
    const products = await Products.find(find)

    // console.log(products);

    res.render('admin/pages/products/index', {
        pageTitle : "Trang chủ",
        products : products,
        filterStatus : filterStatus,
        keyword : keyword
    });
}