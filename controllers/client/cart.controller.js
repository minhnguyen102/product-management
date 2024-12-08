const Cart = require("../../model/cart.model")

// [POST] /cart/add/:productId
module.exports.addPost = async (req, res) => {
    
    const cartId = req.cookies.cartId;
    const productId = req.params.productId;
    const quantity = req.body.quantity;

    const objectCart = {
        product_id : productId,
        quantity : quantity
    }

    await Cart.updateOne(
        {
            _id : cartId,
        },
        {
            $push : {products : objectCart}
        }
    )
    // res.send("OK")
    req.flash('success', `Thêm mới sản phẩm thành công`);
    res.redirect(`back`)
}