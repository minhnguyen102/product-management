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

