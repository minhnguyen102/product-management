const express = require('express'); 
const methodOverride = require('method-override')
const bodyParser = require('body-parser')
require('dotenv').config()

const routeAdmin = require("./routes/admin/index.route")
const route = require("./routes/client/index.route")


//MONGOOSE
const database = require('./config/database');
database.connect();

const app = express(); 
const port = process.env.PORT; 

// methodOverride
app.use(methodOverride('_method'))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// pug
app.set('views', './views');
app.set('view engine', 'pug');

// dùng để pulic các file trong folder public
app.use(express.static('public')) 

// Routes
route(app);
routeAdmin(app)

// App locals variables
const systemConfig = require("./config/system")
app.locals.prefixAdmin = systemConfig.prefixAdmin;

app.listen(port, () => {  
    console.log(`Example app listening on port ${port}`);
});