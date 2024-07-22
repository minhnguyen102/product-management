const express = require('express'); 
const router = express.Router();

const controller = require('../../controllers/client/home.controller');

router.get('/', controller.index);

module.exports = router; // cho phép các file khác được require