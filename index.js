const express = require('express');
const port = 8000;
const app = express();

// setup ejs
app.set('views','./views');
app.set('view engine','ejs');

// route for homepage
app.use('/',require('./routes/index'));

app.listen(port,function(err){
    if(err){
        console.log("Server Error while connecting !!!",err);
        return;
    }
    console.log(`Successfully connected to Express Server at port: ${port}`);
})