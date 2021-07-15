const express = require('express');
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const sassMiddleware = require('node-sass-middleware');
// passport, cookie,localStrategy
const cookieParser = require('cookie-parser');
const session = require('express-session');
// By doing require('connect-mongo')(session), you're running the method returned from the require('connect-mongo') with the session passed into it.
const MongoStore  = require('connect-mongo')(session);
const passport = require('passport');
const localStrategy = require('./config/passport_local');
const db = require('./config/mongoose');

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
app.use(cookieParser());
// setup ejs
app.set('views','./views');
app.set('view engine','ejs');
// use express layouts
app.use(expressLayouts);
app.set("layout extractScripts",true);
app.set("layout extractStyles",true);
// session cookies
app.use(session({
    name: 'socialUser',
    secret : 'idontknowsecret',
    resave : false,
    saveUninitialized : false,
    cookie:{
        maxAge: (1000*60*100) 
    },
    store: new MongoStore (
    {
        mongooseConnection : db,
        autoRemove : 'disabled'
    },function(err){
        console.log("Error",err);
    })
}));
app.use(passport.initialize());
app.use(passport.session());
// set locals.user from req.user
app.use(passport.setAuthenticatedUser);
// route for homepage
app.use('/',require('./routes/index'));

app.listen(port,function(err){
    if(err){
        console.log("Server Error while connecting !!!",err);
        return;
    }
    console.log(`Successfully connected to Express Server at port: ${port}`);
});