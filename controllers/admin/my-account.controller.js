const Account = require("../../model/accounts.model");
const md5 = require('md5');
// [GET] /admim/my-account
module.exports.index = async (req, res) => {
    res.render('admin/pages/my-account/index', {
        pageTitle : "Trang danh sách tài khoản"
    });
}
// [GET] /admim/my-account/edit
module.exports.edit = async (req, res) => {
    res.render('admin/pages/my-account/edit', {
        pageTitle : "Trang danh sách tài khoản"
    });
}
// [PATCH] /admim/my-account/edit
module.exports.editPatch = async (req, res) => {
    const id = res.locals.user.id;
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