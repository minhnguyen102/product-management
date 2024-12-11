const dashboardRoutes = require("./dashboard.route");
const productsRoutes = require("./products.route");
const productsCategoryRoutes = require("./products-category.route");
const rolesRoutes = require("./roles.route");
const accountsRoutes = require("./accounts.route");
const authRoutes = require("./auth.route");
const orderRoutes = require("./orders.route");

const systemConfig = require("../../config/system");
const auth = require("../../middlewares/admin/auth.middleware")
const myAccountRoutes = require("./my-account.route")


module.exports = (app) => {
    const PATH_ADMIN = systemConfig.prefixAdmin;

    app.use(PATH_ADMIN + '/dashboard', auth.requireAuth, dashboardRoutes);
    app.use(PATH_ADMIN + '/products', auth.requireAuth, productsRoutes);
    app.use(PATH_ADMIN + '/products-category', auth.requireAuth, productsCategoryRoutes);
    app.use(PATH_ADMIN + '/roles', auth.requireAuth, rolesRoutes);
    app.use(PATH_ADMIN + '/accounts', auth.requireAuth, accountsRoutes);
    app.use(PATH_ADMIN + '/my-account',auth.requireAuth, myAccountRoutes);
    app.use(PATH_ADMIN + '/auth', authRoutes);
    app.use(PATH_ADMIN + '/orders',auth.requireAuth, orderRoutes);
}