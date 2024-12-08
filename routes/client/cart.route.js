const express = require('express'); 
const router = express.Router();

const controller = require('../../controllers/client/cart.controller');

router.post('/add/:productId', controller.addPost);

module.exports = router; // cho phép các file khác được require