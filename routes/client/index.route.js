const productRoutes = require("./product.route");
const homeRoutes = require("./home.route");
const searchRoutes = require("./search.route");
const productsCategoryMiddlewate = require("../../middlewares/clients/productsCategory.middleware")

module.exports = (app) => {
    app.use(productsCategoryMiddlewate.productsCategory)
    app.use('/', homeRoutes);
    app.use('/products', productRoutes);
    app.use('/search', searchRoutes);
}