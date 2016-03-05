// BASE SETUP
// =============================================================================
// call the packages we need
var express = require('express');
var jokes = require('./../model/jokes');
var router = express.Router();

// ROUTES FOR THE API
// =============================================================================
router.post('/storejoke', function(req, res){
  var newJoke = req.body.joke;
  jokes.addJoke(newJoke);
  res.json({newJoke: newJoke});
});

router.get('/joke/random', function(req,res,next){
  res.json({joke : jokes.getRandomJoke()});
});

router.get('/jokes', function(req,res,next){
  res.json({allJokes : jokes.allJokes});
});

router.put('/joke/:joke_id', function(req, res){
  var id = req.params.joke_id;
  jokes.allJokes[id] = req.body.joke;
  res.json({message: "Joke with id: " + id + " was succesfully updated"});
});

router.delete('/joke/:joke_id', function(req, res){
  var id = req.params.joke_id;
  jokes.removeJoke(id);
  res.json({message: "Joke with id: " + id + " was succesfully removed"});
});

module.exports = router;
