"use strict";
let express = require('express'),
    app = express(),
    router = require('./router'),
    bodyParser = require('body-parser'),
    cors = require('cors');
app.set('PORT', process.env.PORT || 4000);
app.use(bodyParser.json({}));
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);
app.use(cors());
app.use(express.static(__dirname+"/public"));
app.use('/', router);
app.use("/",function(req,res){
    res.sendFile(__dirname+"/public/index.html");
})
app.use("/",(error, req, res) => {
    if (error) {
       // console.log("error : ", error);
        res.status(404).json({ error: error })
    }
    else {
        res.status(500).json({ message: "Please request for a valid Url Or valid HTTP method" })
    }
})

app.listen(app.get('PORT'), () => {
    console.log("Web scraping application is listening on PORT : ", app.get('PORT'));
})