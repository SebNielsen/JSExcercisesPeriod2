exports.calculate = function(operation, n1 , n2){
    switch(operation) {
        case "plus" :
            return n1 + n2; break;
        case "minus" :
            return n1 - n2; break;
        case "multiply":
            return n1 * n2; break;
        case "divide" :
            if (n1 === 0 || n2 === 0){
                throw new Error("Attempt to divide by zero")
            } else return n1/n2; break;
        default : break;
    }
};

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