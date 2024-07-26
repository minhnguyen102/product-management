const express = require('express'); 
require('dotenv').config()

const routeAdmin = require("./routes/admin/index.route")
const route = require("./routes/client/index.route")


//MONGOOSE
const database = require('./config/database');
database.connect();

const app = express(); 
const port = process.env.PORT; 

// pug
app.set('views', './views');
app.set('view engine', 'pug');

// dùng để pulic các file trong folder public
app.use(express.static('public')) 

// Routes
route(app);
routeAdmin(app)

app.listen(port, () => {  
    console.log(`Example app listening on port ${port}`);
});