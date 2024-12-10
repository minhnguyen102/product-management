const md5 = require("md5")
const User = require("../../model/user.model")
// [GET] /user/register
module.exports.register = async (req, res) => {
    res.render('client/pages/user/register', {
        pageTitle : "Trang đăng ký",
    });
}
// [POST] /user/registerPost
module.exports.registerPost = async (req, res) => {
    console.log(req.body);
    const exisEmail = await User.findOne({
        email : req.body.email
    })
    if(exisEmail){
        req.flash('error', `Email đã tồn tại. Vui lòng đăng ký bằng email khác`);
        res.redirect(`back`);
        return;
    }

    req.body.password = md5(req.body.password);
    const user = new User(req.body);
    await user.save();
    console.log(user);

    res.cookie("tokerUser", user.tokenUser)

    res.redirect("/")

}