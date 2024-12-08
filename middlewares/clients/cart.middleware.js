const Cart = require("../../model/cart.model")

module.exports.cartId = async (req, res, next) => {
    // console.log(req.cookies.cardId);

    if(!req.cookies.cartId){
        // neu khong ton tai
        const cart = new Cart();
        await cart.save();
        // console.log(cart);

        const timeSave = 1000 * 60 * 60 * 24 * 365 // Lưu 1 năm
        res.cookie("cartId", cart.id, { expires: new Date(Date.now() + timeSave) })
    }else{
        // neu ton tai
    }

    next();
}