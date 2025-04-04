module.exports.registerPost = (req, res, next) => {
    if(!req.body.fullName){
        req.flash('error', `Vui lòng nhập họ tên`);
        res.redirect(`back`);
        return;
    }
    if(!req.body.email){
        req.flash('error', `Vui lòng nhập email`);
        res.redirect(`back`);
        return;
    }

    if(!req.body.password){
        req.flash('error', `Vui lòng nhập mật khẩu`);
        res.redirect(`back`);
        return;
    }
    if(!req.body.repassword){
        req.flash('error', `Vui lòng nhập xác nhận mật khẩu`);
        res.redirect(`back`);
        return;
    }

    if(req.body.repassword != req.body.password){
        req.flash('error', `Mật khẩu nhập lại không chính xác`);
        res.redirect(`back`);
        return;
    }
    next();
}

module.exports.loginPost = (req, res, next) => {
    if(!req.body.email){
        req.flash('error', `Vui lòng nhập email`);
        res.redirect(`back`);
        return;
    }
    if(!req.body.password){
        req.flash('error', `Vui lòng nhập mật khẩu`);
        res.redirect(`back`);
        return;
    }
    next();
}