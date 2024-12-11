const express = require('express'); 
const router = express.Router();

const controller = require('../../controllers/client/user.controller');
const validate = require("../../validates/user/register.validate")


router.get('/register', controller.register);

router.post('/register', validate.registerPost, controller.registerPost);

router.get('/login', controller.login)

router.post('/login',validate.loginPost, controller.loginPost)

router.get('/logout', controller.logout)

module.exports = router; // cho phép các file khác được require