const express = require('express'); 
const router = express.Router();

const multer  = require('multer');
const storageMulter = require("../../helpers/storageMulter");
const upload = multer({storage: storageMulter()});

const controller = require('../../controllers/admin/products.controller');
const validate = require("../../validates/admin/product.validate")

router.get('/', controller.index);

router.patch('/change-status/:status/:id', controller.changeStatus);

router.patch('/change-multi', controller.changeMulti);

router.delete('/delete/:id', controller.deleteItem);

router.get('/create', controller.create);

router.post(
    '/create',
    upload.single('thumbnail'),
    validate.createPost,
    controller.createPost);


module.exports = router; // cho phép các file khác được require 