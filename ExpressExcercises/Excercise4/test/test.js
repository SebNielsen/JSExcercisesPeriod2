/**
 * Created by sebastiannielsen on 02/03/2016.
 */
var request = require("request");

var getRandom = {
    url: "http://localhost:3000/api/joke/random", method: "GET",
    json : true
};

var getAll = {
    url: "http://localhost:3000/api/jokes", method: "GET",
    json : true
};

var storeJoke = {
    url: "http://localhost:3000/api/storejoke", method: "POST",
    json : true,
    body : {joke : "I'm a joke"}
};

var updateJoke = {
    url: "http://localhost:3000/api/joke/3", method: "PUT",
    json : true,
    body : {joke : "I'm a updated joke"}
};

var deleteJoke = {
    url: "http://localhost:3000/api/joke/2", method: "DELETE",
    json: true
};

request(getRandom,function(error,res,body){
    console.log(body.joke); //Assume the service returns the a random Joke
});

request(getAll,function(error,res,body){
    console.log(body.allJokes); //Assume the service returns an array with all Jokes
});

request(storeJoke,function(error,res,body){
    console.log(body.newJoke); //Assume the service returns the new Joke
});

request(updateJoke,function(error,res,body){
    console.log(body.message); //Assume the service returns an update message
});

request(deleteJoke,function(error,res,body){
    console.log(body.message); //Assume the service returns an remove message
});