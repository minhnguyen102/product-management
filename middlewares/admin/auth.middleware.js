const Account = require("../../model/accounts.model");
const systemConfig = require("../../config/system");

module.exports.requireAuth = async (req, res, next) =>{
    if(!req.cookies.token){
        res.redirect(`${systemConfig.prefixAdmin}/auth/login`)
    }else{
        const user = await Account.findOne({token : req.cookies.token});
        if(user){
            next()
        }else{
            res.redirect(`${systemConfig.prefixAdmin}/auth/login`)
        }
    }
}