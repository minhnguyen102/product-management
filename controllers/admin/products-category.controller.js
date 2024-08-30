const ProductCategory = require("../../model/products-category.model");
const createTreeHelper = require("../../helpers/createTree")

// [GET] /admim/products-category
module.exports.index = async (req, res) => {
    let find = {
        deleted: false
    }
    const records = await ProductCategory.find(find);
    const newRecords = createTreeHelper.tree(records);
    res.render('admin/pages/products-category/index', {
        pageTitle: "Trang danh mục sản phẩm",
        records: newRecords
    });
}

// [GET] /admim/products-category/create
module.exports.create = async (req, res) => {
    let find = {
        deleted: false
    }

    const records = await ProductCategory.find(find);
    const newRecords = createTreeHelper.tree(records);

    res.render('admin/pages/products-category/create', {
        records: newRecords
    });
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

// [GET] /admim/products-category/edit/:id
module.exports.edit = async (req, res) => {
    try {
        let find = {
            deleted: false,
            _id: req.params.id
        }
        const records = await ProductCategory.find({deleted : false});
        const newRecords = createTreeHelper.tree(records);
        const data = await ProductCategory.findOne(find);
        res.render('admin/pages/products-category/edit', {
            pageTitle: "Trang chỉnh sửa danh mục sản phẩm",
            data: data,
            records: newRecords
        });
    } catch (error) {
        res.redirect("/admin/products-category")
    }
    
}
// [PATCH] /admim/products-category/edit/:id
module.exports.editPatch = async (req, res) => {
    id = req.params.id;
    req.body.position = parseInt(req.body.position);
    
    await ProductCategory.updateOne({_id: id}, req.body);
    req.flash('success', `Cập nhật sản phẩm thành công`);
    res.redirect('back'); 
    
}

// [DELETE] /admim/products-category/delete
module.exports.delete = async (req, res) =>{
    const id = req.params.id;

    await ProductCategory.updateOne(
        {_id: id},
        {
            deleted : true,
            deletedAt : new Date()
        }
    )
    req.flash('success', `Xóa sản phẩm thành công`);
    res.redirect("back");
}