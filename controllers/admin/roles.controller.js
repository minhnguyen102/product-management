const Roles = require("../../model/roles.model");
const systemConfig = require('../../config/system')
// [GET] /admim/roles
module.exports.index = async (req, res) => {
    const find = {
        deleted : false
    }
    const records = await Roles.find(find);
    // console.log(records);

    res.render('admin/pages/roles/index', {
        pageTitle : "Trang danh sách nhóm quyền",
        records : records
    });
}

// [GET] /admim/roles/create
module.exports.create = async (req, res) => {
    res.render('admin/pages/roles/create', {
        pageTitle : "Trang tạo mới nhóm quyền"
    });
}

// [POST] /admim/roles/create
module.exports.createPost = async (req, res) => {
    const role = new Roles(req.body);
    await role.save();
    res.redirect(`${systemConfig.prefixAdmin}/roles`)
}

// [GET] /admim/roles/edit/:id
module.exports.edit = async (req, res) => {
    try {
        let find = {
            deleted: false,
            _id: req.params.id
        }
        const record = await Roles.findOne(find);
        
        res.render('admin/pages/roles/edit', {
            pageTitle : "Trang chỉnh sửa nhóm quyền",
            record : record
        });
    } catch (error) {
        res.redirect(`${systemConfig.prefixAdmin}/roles`)
    }
}

// [PATCH] /admim/roles/edit/:id
module.exports.editPatch = async (req, res) => {
    try {
        await Roles.updateOne({
            deleted:false,
            _id : req.params.id
        }, req.body);
        req.flash('success', `Cập nhật thành công`);
    } catch (error) {
        req.flash('error', `Cập nhật thất bại`);
    }
    res.redirect('back'); // option ở lại trang tạo sản phẩ
    
}

// [GET] /admim/roles/detail/:id
module.exports.detail = async (req, res) => {
    try {
        let find = {
            deleted: false,
            _id: req.params.id
        }
        const record = await Roles.findOne(find);
        
        res.render('admin/pages/roles/detail', {
            pageTitle : "Trang chi tiết nhóm quyền",
            record : record
        });
    } catch (error) {
        res.redirect(`${systemConfig.prefixAdmin}/roles`)
    }
}

// [DELETE] /admim/roles/delete/:id
module.exports.delete = async (req, res) => {
    const id = req.params.id
    await Roles.updateOne({_id : id},
        {
            deleted : true,
            deletedAt: new Date()
        });

    req.flash('success', `Xóa sản phẩm thành công`);
    res.redirect("back")
}

// [GET] /admim/roles/permission
module.exports.permissions = async (req, res) => {
    const find = {
        deleted : false
    }
    const records = await Roles.find(find);
    res.render('admin/pages/roles/permissions', {
        pageTitle : "Trang phân quyền",
        records : records
    });
}

// [PATCH] /admim/roles/permission
module.exports.permissionsPatch = async (req, res) => {
    // console.log(req.body);
    const data_permissions = JSON.parse(req.body.permissions);
    for (let item of data_permissions) {
        await Roles.updateOne({_id : item._id}, {permissions : item.permissions})
    }
    req.flash("success", "Cập nhật phân quyền thành công!");
    res.redirect("back");
}

