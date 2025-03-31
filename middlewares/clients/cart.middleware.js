const Cart = require("../../model/cart.model")

module.exports.cartId = async (req, res, next) => {
    // console.log(req.cookies.cardId);

    if(!req.cookies.cartId){
        // neu khong ton tai
        const cart = new Cart();
        await cart.save();

        const timeSave = 1000 * 60 * 60 * 24 * 365 // Lưu 1 năm
        res.cookie("cartId", cart.id, { expires: new Date(Date.now() + timeSave) })
    }else{
        // neu ton tai => lấy ra số lượng sản phẩm trong giở hàng trả về view
        const cart = await Cart.findOne({
            _id : req.cookies.cartId
        }) 

        cart.totalQuantity = cart.products.reduce((sum, item) => sum + item.quantity, 0)        
        res.locals.miniCart = cart;
    }

    next();
}