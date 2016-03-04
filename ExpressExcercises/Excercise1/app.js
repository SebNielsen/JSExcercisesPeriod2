/**
 * Created by sebastiannielsen on 25/02/2016.
 */
var express = require('express');
var bodyParser = require('body-parser');
var app = express();


app.use(bodyParser.urlencoded({extended: false}));
app.use("/api/calculator/:operation/:n1/:n2", function(req, res, next){
   req.calculatorRequest = {
       operation : req.params.operation,
       n1: Number(req.params.n1),
       n2: Number(req.params.n2)
   };
    next();
});


app.get('/api/calculator/*', function(req, res){
    var operation = req.calculatorRequest.operation;
    var n1 = req.calculatorRequest.n1;
    var n2 = req.calculatorRequest.n2;
    var result = 0;

    if(operation === "plus") {
        result = n1 + n2;
        res.send(""+result);
    }
    else if(operation === "minus") {
        result = n1-n2;
        res.end(""+result);
    }
    else if(operation === "multiply") {
        result = n1 * n2;
        res.end(""+result);
    }
    else if(operation === "divide") {
        result = n1 / n2;
        res.end(""+result);
    }
});


app.listen(3000, function(req, res){
    console.log("Server started, listening on: "+3000);
});