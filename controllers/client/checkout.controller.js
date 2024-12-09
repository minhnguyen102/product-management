const Cart = require("../../model/cart.model")
const Product = require("../../model/products.model")
const Order = require("../../model/order.model")
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

module.exports.order = async (req, res) =>{ 
    const cartId = req.cookies.cartId;
    const userInfo = req.body;

    const cart = await Cart.findOne({
        _id : cartId
    })

    let products = []
    for(const product of cart.products ){
        const objectProduct = {
            product_id : product.product_id,
            price : 0,
            discountPercentage : 0,
            quantity : product.quantity
        }
        const productInfo = await Product.findOne({
            _id : product.product_id
        })

        objectProduct.price = productInfo.price;
        objectProduct.discountPercentage = productInfo.discountPercentage;
        products.push(objectProduct);

// Cap nhat lai sp con lai

        const newStock = productInfo.stock - product.quantity;
        await Product.updateOne({
            _id : product.product_id
        },{
            stock : newStock
        })
    }
// End

    const objectOrder = {
        cart_id :cartId,
        userInfo :userInfo,
        products : products
    }

    const order = new Order(objectOrder);
    await order.save();

    await Cart.updateOne({
        _id : cartId
    },{
        products : []
    })
    res.redirect(`/checkout/success/${order.id}`)
}