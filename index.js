const express = require('express');
const path = require('path'); 
const methodOverride = require('method-override')
const flash = require('express-flash')
const cookieParser = require('cookie-parser')
const session = require('express-session')
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

//flash
app.use(cookieParser('NKMTTL'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());

// TinyMCE
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));
// End TinyMCE

// pug
app.set('views', `${__dirname}/views`);
app.set('view engine', 'pug');

// dùng để pulic các file trong folder public
app.use(express.static(`${__dirname}/public`)) 

// Routes
route(app);
routeAdmin(app)

// App locals variables
const systemConfig = require("./config/system")
app.locals.prefixAdmin = systemConfig.prefixAdmin;

app.listen(port, () => {  
    console.log(`Example app listening on port ${port}`);
});