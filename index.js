const express = require('express'); 
require('dotenv').config()
const route = require("./routes/client/index.route")

const app = express(); 
const port = process.env.PORT; 

// pug
app.set('views', './views');
app.set('view engine', 'pug');

app.use(express.static('public')) // dùng để pulic các file trong folder public

// Routes
route(app);

app.listen(port, () => {  
    console.log(`Example app listening on port ${port}`);
});