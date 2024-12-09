const express = require('express'); 
const router = express.Router();

const controller = require('../../controllers/client/cart.controller');

router.get("/", controller.index)

router.post('/add/:productId', controller.addPost);

module.exports = router; // cho phép các file khác được require