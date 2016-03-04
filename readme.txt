#Exam questions period 2
##1. Why would you consider a Scripting Language as JavaScript as your Backend Platform.
A great thing with JavaScript is that, not only you can use the same language for client and server side,
but you also can use JSON, a subset of the "JavaScript Object Notation", for transport on the network and
to store data in NoSQL database. Databases which as CouchDB, MongoDB, Riak, or wakandaDB also works with
JavaScript instead of SQL. It is fast to implement features managing formats changing every time, and it
is also fast to test and update the application. The use of NodeJs and Express makes it easy to extend and
update the application. Therefore is the use of Javascript as a backend also very flexible.

##2.Explain Pros & Cons in using Node.js + Express to implement your Backend
Pros:
----------
- Handles the I/O scaling problem very well.

- The event loop which is a single thread that performs all I/O operations asynchronously.

- If your application doesn’t have any CPU intensive computation, you can build it in Javascript top-to-bottom,
even down to the database level if you use JSON storage Object DB like MongoDB.

- Crawlers receive a fully-rendered HTML response, which is far more SEO-friendly than, say, a Single Page
Application or a websockets app run on top of Node.js.

Cons:
----------
- Any CPU intensive computation will block Node.js responsiveness, so a threaded platform is a better approach.

- Using Node.js with a relational database should be very difficult.

##3Explain strategies to implement a Node.js based server architecture that still could take advantage of a multi-core Server.
A strategy to handle these CPU intensive computations could be the use of a module that enables “clustering”
Node.js which runs as many dedicated single threaded processes under a master Node.js process. In Node.js
clustering, the Node.js server consists of multiple processes executing on the same processor, typically one
for each core. We start the main process called the master process. Master process starts and manages other
processes called worker processes which do the actual work of handling incoming requests.
Although using a cluster module sounds complex in theory, it is very straightforward to implement.
To start using it, you have to include it in your Node.js application:

var cluster = require('cluster);

A cluster module executes the same Node.js process multiple times. Therefore, the first thing you need to
do is to identify what portion of the code is for the master process and what portion is for the workers.
The cluster module allows you to identify the master process as follows:

if(cluster.isMaster) { ... }

The master process is the process you initiate, which in turn initialize the workers. To start a worker
process inside a master process, we’ll use the fork() method:

cluster.fork();

EXAMPLE:
-------------
var cluster = require('cluster');
var http = require('http');
var numCPUs = 4;

if (cluster.isMaster) {
    for (var i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
} else {
    http.createServer(function(req, res) {
        res.writeHead(200);
        res.end('process ' + process.pid + ' says hello!');
    }).listen(8000);
}

##4.Explain the Express concept middleware.
Since Express only supports some basic features, the Express middlewate is a possibility for expand
the amount of features, according to your needs. That means that Express middlewares are pluggable
JavaScript components, which make Express apps very modular, flexible, and extensible. A middleware is
a function with access to the request and repsonse object, well as the next middleware in line. Since
middleware are executed serially, their order of inclusion is important. If the current middleware is
not ending the request-response cycle, it is important to call next() to pass on the control to the
next middleware, else the request will be left hanging.

Example of a Third-party middleware
-----------------------------------
app.use(bodyParser.urlencoded({extended = false}))

The middleware above will create a new body object containing the parsed data, and populate the req.body
property with this object, or an empty object ({}) if there was no body to parse. This object will contain
key-value pairs, where the value can be a string or array (when extended is false), or any type (when
extended is true).

You can also make your own custom middleware like the example below:

app.use(function (req, res, next) {
   console.log('Time:', Date.now()+"Log all requests");
   next();
}

The use of this middleware means that when a request arrives and hits the function it will print its
message, and then call the next(), to pass on the control to the next middleware.


##5.Explain how to implement sessions.
Server side technologies can implement state or server side sessions using one or more of the following
methods:

- HTTP cookies.
- Query string parameters, for example: /index.php?session_id=some_unique_session_code.
- Hidden variables within web forms

A user's session for a website exists in temporary memory only while the user is reading and navigating
the website. Web browsers normally delete session cookies when the user closes the browser.

To implement a session cookie in a Express Application, the first thing to do is to require the module
express-session.

var session = require('express-session');

Then we can use this middleware to create a session cookie. In the example below have I used three properties
in the options object.

app.use(session({secret:'secret_3162735', saveUninitialized:true, resave:true}));

The secret property is used to sign the session ID cookie. This can be either a string
for a single secret, or an array of multiple secrets.

The saveUninitialized property forces a session that is "uninitialized" to be saved to the store. A session
is uninitialized when it is new but not modified. Choosing false is useful for implementing login sessions,
reducing server storage usage, or complying with laws that require permission before setting a cookie.
Choosing false will also help with race conditions where a client makes multiple parallel requests without
a session.

The default value is true, but using the default has been deprecated, as the default will change in the future.

The resave property forces the session to be saved back to the session store, even if the session was never
modified during the request.

Finally we can make a custom middleware to make sure that the user has logged in.
app.use(function (req,res,next){

   if(session.userName !== undefined){
      next();
   }
   else if(req.body.userName !== undefined){
     if(req.body.userName.length > 0){
       session.userName = req.body.userName;
       res.redirect("/api/")
     }
     res.redirect("/api/login")
   }
  else {
     req.url = "/api/login";
     next();
   }
});

Using the session object for the sole purpose of carrying out the transmission of a communication, doesn't
require the users accept. But tracking and gather information about the users behavior does require the users
accept.

##6.Compare the express strategy toward (server side) templating with the one you used with Java on second semester.
A web template system uses a template processor to combine web templates to form finished web pages,
possibly using some data source to customize the pages or present a large amount of content on
similar-looking pages. Server side templating can be ccharacterized like this: The controller gets some
data from the model and pass it on to the view. The view then sends some data back to the controller,
and then back to the model.

On the second semester did we use the mvc pattern like this:
Model -> Controller -> Servlet/JSP

And on fourth semester are we using the mvc pattern like this:
Model -> Controller/Router -> Jade/EJS/Handlebars

Using Jade, EJS or Handlebars is much equal to how we used JSP on second semester. They all have some different
syntax, but all of them can be used to render a html page, based on some logical expressions. In JSP we used Java
to write the logical behavior and with the other ones we use JavaScript. That means when we used Java for our
backend, we had to use JSP, with JavaScript we have the other three options.

##7.Explain your strategy for implementing a REST-API with Node/Express and show how you can "test" all the four CRUD operations programmatically using for example the Request package.
Like always we start to make the base setup like this:

// call the packages we need
var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST rendered in the req.body object
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

Then we need to register all our routes or endpoints. By using this statement all our routes will be prefixed with /api.

app.use('/api', router);

We can make a get endpoint which returns a random joke like this.

router.get('/joke/random', function(req,res,next){
  res.json({joke : jokes.getRandomJoke()});
});

We are sending back information as JSON data. This is standard for an API and will help the people using our API to use our data.

To store a new joke we can make an endpoint or route like this and return a JSON message back.

router.post('/storejoke', function(req, res){
  jokes.addJoke(req.body.joke);
  res.json({Message: "New Joke succesfully stored"});
});

Updating a joke can be done like this:

router.put('/joke/:joke_id', function(req, res){
  var id = req.params.joke_id;
  jokes.allJokes[id] = req.body.joke;
  res.json({message: "Joke with id: " + id + " was succesfully updated"});
});

And finally a delete endpoint could be done like this:

router.delete('/joke/:joke_id', function(req, res){
  var id = req.params.joke_id;
  jokes.removeJoke(id);
  res.json({message: "Joke with id: " + id + " was succesfully removed"});
});

To test all these endpoints we can use the request package like this:

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

This kind of testing is similar to the use of POSTMAN where you can test the request and response.
That means you cannot make an assert.

##8.Explain, using relevant examples, about testing JavaScript code, relevant packages (Mocha etc.) and how to test asynchronous code

To test JavaScript code, we can install and use the test librabry "Mocha". In Mocha we use an describe
block, which corresponds to a test suite where we can place all our test. The describe block takes two
parameters,the first one is the name of the block, and the second is an anonymous function, where we can
place the so called "it blocks" which corresponds to all our test methods. Like the describe block the it
blocks also takes two parameters; a name, and an anonymous function. Inside the anonymous function we can
use the different assertion libraries like "chai", two assert different scenarios. Fx. like this:

describe('Calculate', function(){
   it('returns the sum of the numbers after a plus operation', function(){
       var result = cal.calculate("plus", 2, 2);

       expect(result).to.equal(4);
       expect(result).to.be.a('number');
   });
});

If i wanted to initialse or clean up after my test i could use the so called hooks:

  before(function() {
    // runs before all tests in this block
  });

  after(function() {
    // runs after all tests in this block
  });

  beforeEach(function() {
    // runs before each test in this block
  });

  afterEach(function() {
    // runs after each test in this block
  });

If a want to test a async function like a call to my joke api i can do it like this:

describe('Get random Joke', function(){
    it('returns a random joke from my own api', function(done){
        module.joke(function(reply){
            console.log(reply);
            done();
        })
    })
});

The important thing to remember when testing async is simply to add a callback (usually named done) to it().
Then Mocha will know that it should wait for completion.

The code below is the code i get from the "module.joke" in my "it block".
-----------------
exports.joke = function(callback){
  var http = require('http');

  var str = '';

  http.get('http://localhost:3000/api/joke/random', function(response){
      response.on('data', function(data){
          str += data;
      });

      response.on('end', function(){
          callback(JSON.parse(str));
      });

      response.on('error', function(error){
         console.log(error);
         callback(error);
      });
  })
      .end();
};
*/

##9Explain, using relevant examples, different ways to mock out databases, HTTP-request etc?
Normally when you make a test, it will be a benefit to isolate your test as much as possible,
to avoid influence from other aspects. To isolate a test of a API, and to remove any dependencies,
i could be a good idea to mock the HTTP requests and the database. This can be done by using a
the module Sinon which is used for making stubs.

To use sinon in Mocha and Chai you will have to requrie both sinon and sinon-chai like this:

var sinon = require('sinon');
var sinonChai = require('sinon-chai');
chai.use(sinonChai);

In the example below i use sinon to stub a http request.

describe('Info Language', function () {
    it('returns language info of the repo', function (done) {
        var ghRepo = {
            'language': 'Assembly'
        };
        var stub = sinon.stub().callsArgWith(0, ghRepo);

        word.infoLang(stub, function (reply) {
            expect(reply).to.equal('Language is Assembly');
            console.log(reply);
            done();
        })
    })
});

exports.infoLang = function (infoFunc, callback) {
    infoFunc(function (reply) {
        callback('Language is ' + reply.language);
    });
};
