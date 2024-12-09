const Cart = require("../../model/cart.model")

// [POST] /cart/add/:productId
module.exports.addPost = async (req, res) => {
    
    const cartId = req.cookies.cartId;
    const productId = req.params.productId;
    const quantity = parseInt(req.body.quantity);
    // console.log(quantity);

    const cart = await Cart.findOne({
        _id : cartId
    });
    // console.log(cart.products);

    const exitProductId = cart.products.find(item => item.product_id == productId)
    // console.log(exitProductId);

    if(exitProductId){
        //nếu đã có sản phẩm đó trong giỏ hàng => Cập nhật số lương
        // console.log("Cap nhat so luong")
        const newQuantity = quantity + exitProductId.quantity;
        // console.log(newQuantity);
        await Cart.updateOne({
            _id : cartId,
            'products.product_id' : productId
        },{
            'products.$.quantity' : newQuantity
        })
    }else{
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
    }

    req.flash('success', `Thêm mới sản phẩm thành công`);
    res.redirect(`back`)
}