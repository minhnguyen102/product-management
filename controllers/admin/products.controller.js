const Products = require("../../model/products.model");
const Accounts = require("../../model/accounts.model");
const filterStatusHelper = require("../../helpers/filterStatus");
const SearchHelper = require("../../helpers/search");
const paginationHelper = require("../../helpers/pagination");
const systemConfig = require("../../config/system");
const ProductCategory = require("../../model/products-category.model");
const createTreeHelper = require("../../helpers/createTree");
const Account = require("../../model/accounts.model");

// [GET] /admim/products
module.exports.index = async (req, res) => {
    // filterStatus
    const filterStatus = filterStatusHelper(req.query);
    // console.log(filterStatus);

    let find = {
        deleted: false
    }
    // nếu có status thì mới thựuc hiện 
    if (req.query.status) {
        find.status = req.query.status
    }


    const objectSearch = SearchHelper(req.query);
    if (objectSearch.regex) {
        find.title = objectSearch.regex;
    }

    // Pagination 
    const countProducts = await Products.countDocuments(find);
    let objectPagination = paginationHelper({
            currentPage: 1,
            limitItem: 5, // mục đích truyèn thế này để sau này khi ứng dụng vào các trang khác, số lượng không limitItem có thể thay đổi, lúc đó ta có thể truyền vào thay vì điền cứng là 4
        },
        req.query,
        countProducts
    )
    // End pagination 

    // Sort
    let sort = {}
    if(req.query.sortKey && req.query.sortValue){
        sort[req.query.sortKey] = req.query.sortValue;
    }else{
        sort.position = "desc"
    }
    // Sort
    const products = await Products.find(find)
        .sort(sort)
        .limit(objectPagination.limitItem)
        .skip(objectPagination.skip);

    for (const product of products){
        // lấy ra người tạo sản phẩm
        const user = await Accounts.findOne({
            _id : product.createBy.account_id
        });
        if(user){
            product.accountFullName = user.fullname;
        }

        // lấy ra người chỉnh sửa sản phẩm gần nhất
        if(product.updateBy.length > 0){
            // console.log(product.updateBy[product.updateBy.length - 1].account_id)
            const userUpdate = await Account.findOne({
                _id : product.updateBy[product.updateBy.length - 1].account_id
            })

            if(userUpdate){
                product.updateBy.userUpdate = userUpdate.fullname;
            }
        }
    }

    res.render('admin/pages/products/index', {
        pageTitle: "Trang chủ",
        products: products,
        filterStatus: filterStatus,
        keyword: objectSearch.keyword,
        objectPagination: objectPagination
    });
}

// [PATCH] /admim/products/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
    // console.log(req.params);
    const status = req.params.status;
    const id = req.params.id;
    const updateBy = {
        account_id : res.locals.user.id,
        updateAt : new Date()
    }
    await Products.updateOne({
        _id: id
    }, {
        status: status,
        $push : { // đây là lệnh push vào trong mảng updateBy của model
            updateBy : updateBy
        }
    });

    req.flash('success', 'Cập nhật trạng thái sản phẩm thành công');

    res.redirect('back');
}

// [PATCH] /admim/products/change-multi
module.exports.changeMulti = async (req, res) => {
    
    const type = req.body.type;
    const ids = req.body.ids.split(", ");

    const updateBy = {
        account_id : res.locals.user.id,
        updateAt : new Date()
    }
    console.log(req.body.type)
    console.log(ids)

    // chưa hợp lí
    switch (type) {
        case "active":
            await Products.updateMany({
                _id: {
                    $in: ids
                }
            }, {
                status: type,
                $push : { updateBy : updateBy }
            }, )
            req.flash('success', `Cập nhật trạng thái ${ids.length} sản phẩm thành công`);
            break;
        case "inactive":
            await Products.updateMany({
                _id: {
                    $in: ids
                }
            }, {
                status: type,
                $push : { // đây là lệnh push vào trong mảng updateBy của model
                    updateBy : updateBy
                }
            }, )
            req.flash('success', `Cập nhật trạng thái ${ids.length} sản phẩm thành công`);
            break;

        case "delete-all":
            await Products.updateMany({
                _id: {
                    $in: ids
                }
            }, {
                $set: {
                    deleted: true,
                    deleteBy:{
                        account_id : res.locals.user.id,
                        deleteAt : new Date()
                    }
                }
            }, )
            req.flash('success', `Xóa thành công ${ids.length} sản phẩm `);
            break;
        case "change-position":
            // console.log(ids);
            for (const item of ids) {
                let [id, position] = item.split("-");
                position = parseInt(position);
                // console.log(id);
                // console.log(position);

                await Products.updateOne({
                    _id: id
                }, {
                    position: position,
                    $push : { // đây là lệnh push vào trong mảng updateBy của model
                        updateBy : updateBy
                    }
                });
            }
            req.flash('success', `Thay đổi thành công thứ tự ${ids.length} sản phẩm `);
            break;
        default:
            break;
    }
    res.redirect('back');
}

// [DELETE] /admim/products/delete
module.exports.deleteItem = async (req, res) => {
    const id = req.params.id;

    await Products.updateOne({
        _id: id
    }, {
        deleted: true,
        deleteBy:{
            account_id : res.locals.user.id,
            deleteAt : new Date()
        }
    });
    req.flash('success', `Xóa sản phẩm thành công`);
    res.redirect('back');
}

// [GET] /admim/products/create
module.exports.create = async (req, res) => {
    let find = {
        deleted: false
    }
    const records = await ProductCategory.find(find);
    const newRecords = createTreeHelper.tree(records);

    res.render('admin/pages/products/create',{
        records: newRecords
    });
}

// [POST] /admim/products/create
module.exports.createPost = async (req, res) => {
    req.body.price = parseInt(req.body.price);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    req.body.stock = parseInt(req.body.stock);

    // if (req.file) {
    //     req.body.thumbnail = `/uploads/${req.file.filename}`;
    // }

    // console.log(res.locals.user);

    if (req.body.position == "") {
        const countProducts = await Products.countDocuments();
        req.body.position = countProducts + 1;
    } else {
        req.body.position = parseInt(req.body.position);
    }

    req.body.createBy = {
        account_id : res.locals.user.id
    }
    
    const product = new Products(req.body);
    product.save();

    // res.redirect('back'); // option ở lại trang tạo sản phẩm
    res.redirect(`/admin/products`); // option trở lại trang sản phẩm
}

// [GET] /admim/products/edit
module.exports.edit = async (req, res) => {
    try {
        let find = {
            deleted: false,
            _id: req.params.id
        }
        const records = await ProductCategory.find({deleted: false});
        const newRecords = createTreeHelper.tree(records);

        const product = await Products.findOne(find)

        // console.log(product)
        res.render('admin/pages/products/edit', {
            product: product,
            records: newRecords
        });
    } catch (error) {
        res.redirect(`/admin/products`)
    }
}

// [PATCH] /admim/products/edit
module.exports.editPatch = async (req, res) => {
    req.body.price = parseInt(req.body.price);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    req.body.stock = parseInt(req.body.stock);
    req.body.position = parseInt(req.body.position);

    if (req.file) {
        req.body.thumbnail = `/uploads/${req.file.filename}`;
    }

    try {
        const updateBy = {
            account_id : res.locals.user.id,
            updateAt : new Date()
        }
        await Products.updateOne({
            deleted:false,
            _id : req.params.id
        }, {
            ...req.body,
            $push : { // đây là lệnh push vào trong mảng updateBy của model
                updateBy : updateBy
            }
        });
        req.flash('success', `Cập nhật sản phẩm thành công`);
    } catch (error) {
        req.flash('error', `Cập nhật sản phẩm thất bại`);
    }
    res.redirect('back'); // option ở lại trang tạo sản phẩm
    // res.redirect(`${systemConfig.prefixAdmin}/products/detail/${req.params.id}`)
}

// [GET] /admim/products/detail
module.exports.detail = async (req, res) => {


    try {
        let find = {
            deleted: false,
            _id: req.params.id
        }

        const product = await Products.findOne(find)
        console.log(product)

        const productCategory = await ProductCategory.findOne({
            _id : product.product_category_id
        })

        // console.log(productCategory);
        res.render('admin/pages/products/detail', {
            pageTitle : product.title,
            product: product,
            productCategory : productCategory
        });
    } catch (error) {
        res.redirect(`/admin/products`)
    }
}