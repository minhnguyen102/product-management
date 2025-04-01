const Account = require("../../model/accounts.model");
const md5 = require('md5');
const systemConfig = require("../../config/system");

// [GET] /admim/auth/login
module.exports.login = (req, res) => {
    // console.log(req.cookies.token);
    if(req.cookies.token){
        res.redirect(`${systemConfig.prefixAdmin}/products-category`)
    }else{
        res.render('admin/pages/auth/logintest', {
            pageTitle : "Trang đăng nhập"
        });
    }
    
}

// [POST] /admim/auth/login
module.exports.loginPost = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    let find = {
        email : email,
        deleted : false
    }

    const user = await Account.findOne(find);
    if(!user){
        req.flash("error", "Email không tồn tại");
        res.redirect("back");
        return;
    }

    if(md5(password) !== user.password){
        req.flash("error", "Mật khẩu không hợp lệ");
        res.redirect("back");
        return;
    }

    if(user.status == "inactive"){
        req.flash("error", "Tài khoản đã bị tạm khóa");
        res.redirect("back");
        return;
    }

    res.cookie("token", user.token);
    res.redirect(`${systemConfig.prefixAdmin}/products-category`);
}

// [GET] /admim/auth/logout
module.exports.logout = (req, res) => {
    res.clearCookie("token");
    res.redirect(`${systemConfig.prefixAdmin}/auth/login`)
}