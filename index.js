'use strict';

const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    router = require('./router');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use('/',router);


app.listen(3000,()=>{
    console.log('Server started and listening at 3000')
})
