var expect = require('chai').expect;
var request = require("request");
var http = require("http");
var app = require('../app');
var server;
var TEST_PORT = 3000;

beforeEach(function(done){
   server = http.createServer(app);
   server.listen(TEST_PORT,function(){
       done();
   })
});

afterEach(function(done){
    server.close();
    done();
});

describe("GET: /api/joke/random", function(){
   var options = {
       url: "http://localhost:" + TEST_PORT+ "/api/joke/random",
       method: "GET",
       json: true
   };

    it("Should get a random Joke object", function(done){
        request(options, function (error, res, body){
            var randomJoke = body.joke;
            expect(randomJoke).to.be.a("string");
            done();
        })
    })
});

describe("GET: /api/jokes", function(){
    var options = {
        url: "http://localhost:" + TEST_PORT + "/api/jokes",
        method: "GET",
        json: true
    };

    it("Should get array with all jokes", function(done){
        request(options, function (error, res, body){
            var jokesArray = body.allJokes;
            expect(jokesArray).to.include("A day without sunshine is like, night.");
            expect(jokesArray.length).to.equal(3);
            done();
        })
    })
});

describe("POST: /api/jokes", function(){
    var options = {
        url: "http://localhost:" + TEST_PORT + "/api/storejoke",
        method: "POST",
        json: true,
        body: {joke: "Its better to be late than to arrive ugly"}
    };

    it("Should get a new joke object", function(done){
        request(options, function (error, res, body){
            var addedJoke = body.newJoke;
            expect(addedJoke).to.be.equal("Its better to be late than to arrive ugly");
            done();
        })
    })
});

describe("Is the new Joke added", function(){
    var options = {
        url: "http://localhost:" + TEST_PORT + "/api/jokes",
        method: "GET",
        json: true
    };

    it("Should get array with all jokes", function(done) {
        request(options, function (error, res, body) {
            var jokesArray = body.allJokes;
            expect(jokesArray).to.include("Its better to be late than to arrive ugly");
            expect(jokesArray.length).to.equal(4);
            done();
        })
    });
});



