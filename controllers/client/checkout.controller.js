const Cart = require("../../model/cart.model")
const Product = require("../../model/products.model")
const ProductHelper = require("../../helpers/products")

module.exports.index = async (req, res) =>{

    const cartId = req.cookies.cartId;

    const cart = await Cart.findOne({
        _id : cartId
    })
    // console.log(cart)

    if(cart.products.length > 0){
        for(const item of cart.products){
            const productId = item.product_id;

            let productInfo = await Product.findOne({
                _id : productId
            })
            productInfo.priceNew = ProductHelper.priceNew(productInfo)
            item.productInfo = productInfo;
            item.totalPrice = item.quantity * productInfo.priceNew;
        }
    }

    cart.totalPrice = cart.products.reduce((sum, item) => sum + item.totalPrice, 0)


    res.render('client/pages/checkout/index', {
        pageTitle : "Trang đặt hàng",
        cartDetail : cart
    });
}