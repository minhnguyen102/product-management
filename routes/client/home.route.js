const express = require('express'); 
const router = express.Router();

router.use('/', (req, res) => {
    res.render('client/pages/home/index');
});

module.exports = router; // cho phép các file khác được require