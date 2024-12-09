const productRoutes = require("./product.route");
const homeRoutes = require("./home.route");
const searchRoutes = require("./search.route");
const cartRoutes = require("./cart.route");
const checkoutRoutes = require("./checkout.route");

const productsCategoryMiddlewate = require("../../middlewares/clients/productsCategory.middleware")
const cartMiddlewate = require("../../middlewares/clients/cart.middleware")

module.exports = (app) => {
    app.use(productsCategoryMiddlewate.productsCategory)
    app.use(cartMiddlewate.cartId)

    app.use('/', homeRoutes);
    app.use('/products', productRoutes);
    app.use('/search', searchRoutes);
    app.use('/cart', cartRoutes);
    app.use('/checkout', checkoutRoutes);
}