// BASE SETUP
// =============================================================================

// call the packages we need
var express = require('express'); // call express
var jokes = require('./../model/jokes');
var router = express.Router();
var session = require('express-session');

// ROUTES FOR OUR API
// =============================================================================
router.get('/login', function(req,res,next){
  res.render('login')
});

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', user: session.userName});
  next();
});

router.get('/joke', function(req,res,next){
  if(session.jokeCount !== undefined){
    session.jokeCount++;
  } else {
    session.jokeCount = 0;
    session.jokeCount++;
  }
  res.render('joke', {joke: jokes.getRandomJoke()})
});

router.get('/jokes', function(req,res,next){
  if(session.jokesCount !== undefined){
    session.jokesCount++;
  } else {
    session.jokesCount = 0;
    session.jokesCount++;
  }
  res.render('allJokes', {allJokes: jokes.allJokes})
});

router.get('/addjoke', function(req,res,next){
    res.render('addJoke')
});

router.post('/storejoke', function(req, res){
  if(session.storeJokeCount !== undefined){
    session.storeJokeCount++;
  } else {
    session.storeJokeCount = 0;
    session.storeJokeCount++;
  }
  jokes.addJoke(req.body.joke);
  res.redirect('/addjoke');
});

module.exports = router;
