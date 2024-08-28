const ProductCategory = require("../../model/products-category.model");

// [GET] /admim/products-category
module.exports.index = async (req, res) => {
    let find = {
        deleted: false
    }
    const records = await ProductCategory.find(find);
    res.render('admin/pages/products-category/index',
        {
            pageTitle: "Trang danh mục sản phẩm",
            records : records
        }
    );
}

// [GET] /admim/products-category/create
module.exports.create = async (req, res) => {
    res.render('admin/pages/products-category/create');
}

// [POST] /admim/products-category/create
module.exports.createPost = async (req, res) => {
    if (req.body.position == "") {
        const countProducts = await ProductCategory.countDocuments();
        req.body.position = countProducts + 1;
    } else {
        req.body.position = parseInt(req.body.position);
    }

    const record = new ProductCategory(req.body);
    record.save();

    res.redirect(`/admin/products-category`);
}