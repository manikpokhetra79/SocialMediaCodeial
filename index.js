const express = require('express');
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const sassMiddleware = require('node-sass-middleware');
const db = require('./config/mongoose');
// passport, cookie,localStrategy
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const localStrategy = require('./config/passport_local');

const app = express();
app.use(express.urlencoded());
// use sass middleware
app.use(sassMiddleware({
    src : "./assets/scss",
    dest : "./assets/css",
    debug: true,
    outputStyle: 'extended',
    prefix : '/css'
}));

// use static files
app.use(express.static("assets"));
// setup ejs
app.set('views','./views');
app.set('view engine','ejs');
// use express layouts
app.use(expressLayouts);
app.set("layout extractScripts",true);
app.set("layout extractStyles",true);

// session cookies
app.use(cookieParser());
app.use(session({
    name: 'socialUser',
    secret : 'idontknowsecret',
    resave : false,
    saveUninitialized : false,
    cookie:{
        maxAge: (600000) //10 minutes
    }
}));
app.use(passport.initialize());
app.use(passport.session())
// route for homepage
app.use('/',require('./routes/index'));

app.listen(port,function(err){
    if(err){
        console.log("Server Error while connecting !!!",err);
        return;
    }
    console.log(`Successfully connected to Express Server at port: ${port}`);
})