const express = require('express');
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');
const fileUpload = require('express-fileupload');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

const app = express();
const port = process.env.PORT || 3000;

require('dotenv').config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded( { extended: true } ));
app.use(express.static('public'));
app.use(expressLayouts);

app.use(cookieParser('HPCSSECURE'));
app.use(session({
  secret: 'HPCSSECURE',
  saveUninitialized: true,
  resave: true
}));
app.use(flash());
app.use(fileUpload());

function preventFormResubmission(req, res, next) {
  if (req.method === 'POST') {
    // Redirect the user to the same page with a GET request
    return res.redirect(req.originalUrl);
  }
  // Call the next middleware function in the chain
  next();
}


app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {res.render('dashboard')});

const routes = require('./server/routes/certificate.js')
app.use('/', routes);

const clientRoutes = require('./server/routes/client.js')
app.use('/', clientRoutes);

app.listen(port, ()=> console.log(`Listening to port ${port}`));