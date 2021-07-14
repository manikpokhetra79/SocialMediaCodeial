const express = require('express');
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const sassMiddleware = require('node-sass-middleware')
const app = express();
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
// route for homepage
app.use('/',require('./routes/index'));

app.listen(port,function(err){
    if(err){
        console.log("Server Error while connecting !!!",err);
        return;
    }
    console.log(`Successfully connected to Express Server at port: ${port}`);
})