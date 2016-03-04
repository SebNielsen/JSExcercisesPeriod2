// BASE SETUP
// =============================================================================
var express = require('express'); // call express
var jokes = require('./../model/jokes');
var router = express.Router();
var session = require('express-session');

router.get('/login', function(req,res,next){
  res.render('login')
});

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', user: session.userName});
  next();
});

router.get('/joke', function(req,res,next){
  res.render('joke', {joke: jokes.getRandomJoke()})
});

router.get('/jokes', function(req,res,next){
  res.render('allJokes', {allJokes: jokes.allJokes})
});

router.get('/addjoke', function(req,res,next){
    res.render('addJoke')
});

router.post('/storejoke', function(req, res){
  jokes.addJoke(req.body.joke);
  res.redirect('/addjoke');
});

module.exports = router;
