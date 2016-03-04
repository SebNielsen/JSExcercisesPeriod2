var express = require('express');
var path = require('path');
var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
//app.set('views', process.argv[3]);


app.get('/home', function(req, res){
    res.render('date', {date: new Date().toDateString()});
});

app.listen(process.argv[2] || 3000);