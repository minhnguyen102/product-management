const Account = require("../../model/accounts.model");
const Roles = require("../../model/roles.model");
const systemConfig = require("../../config/system");
const md5 = require('md5');
// [GET] /admim/accounts
module.exports.index = async (req, res) => {
    let find = {
        deleted : false
    }
    const records = await Account.find(find).select("-password -token");

    for (const record of records) {
        const role = await Roles.findOne({_id : record.role_id, deleted :false});
        // console.log(role);
        record.role = role.title;
    }

    // console.log(records);
    res.render('admin/pages/accounts/index', {
        pageTitle : "Trang danh sách tài khoản",
        records : records
    });
}

// [GET] /admim/accounts/create
module.exports.create = async (req, res) => {
    let find = {
        deleted : false
    }
    const records = await Roles.find(find);
    res.render('admin/pages/accounts/create', {
        pageTitle : "Trang tạo mới tài khoản",
        records : records
    });
}

// [POST] /admim/accounts/create
module.exports.createPost = async (req, res) => {
    let find = {
        deleted : false,
        email: req.body.email
    }
    const checkEmail = await Account.findOne(find);
    if(checkEmail){
        req.flash('error', `Email ${req.body.email} đã tồn tại`);
    }else{
        req.body.password = md5(req.body.password);
        const record = new Account(req.body);
        await record.save();
        req.flash('success', `Tạo tại khoản thành công`);
    }
    res.redirect(`back`);
}

// [GET] /admim/accounts/edit/:id
module.exports.edit = async (req, res) => {
    try {
        let find = {
            deleted : false,
            _id : req.params.id
        }
        const record = await Account.findOne(find);
        const roles = await Roles.find({deleted : false});
        // console.log(roles)
        res.render('admin/pages/accounts/edit', {
            pageTitle : "Trang chỉnh sửa tài khoản",
            record : record,
            roles : roles
        });
    } catch (error) {
        res.redirect(`${systemConfig.prefixAdmin}/accounts`)
    }
}

// [GET] /admim/accounts/editPatch/:id
module.exports.editPatch = async (req, res) => {
    const id = req.params.id;
    let find = {
        _id : {$ne : id},
        deleted : false,
        email: req.body.email
    }
    const checkEmail = await Account.findOne(find);
    if(checkEmail){
        req.flash('error', `Email ${req.body.email} đã tồn tại`);
    }else{
        if(req.body.password){
            req.body.password = md5(req.body.password);
        }else{
            delete req.body.password
        }
        await Account.updateOne({_id : id}, req.body);
        req.flash('success', `Cập nhật tài khoản thành công`);
    }
    res.redirect("back")
    
}