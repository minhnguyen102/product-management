const Cart = require("../../model/cart.model")
const Product = require("../../model/products.model")
const ProductHelper = require("../../helpers/products")

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

// [GET] /cart/
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

    res.render('client/pages/cart/index', {
        pageTitle : "Trang giỏ hàng",
        cartDetail : cart
    });
}

// [GET] /cart/delete/:productId
module.exports.delete = async (req, res) =>{
    const productId = req.params.productId;
    const cartId = req.cookies.cartId;

    await Cart.updateOne(
        { _id : cartId }, 
        { "$pull": { products: { "product_id": productId }}}
    );

    req.flash('success', `Xóa sản phẩm thành công`);
    res.redirect(`back`)
}

// [GET] /cart/update/:productId/:quantity
module.exports.update = async (req, res) =>{
    const cartId = req.cookies.cartId;
    const productId = req.params.productId;
    const quantity = req.params.quantity;

    await Cart.updateOne({
        _id : cartId,
        'products.product_id' : productId
    },{
        'products.$.quantity' : quantity
    })    

    req.flash('success', `Cập nhật số lượng sản phẩm thành công`);
    res.redirect(`back`)
}