var request = require("request");

exports.getAvailableTickets = function (airport,date,numbOfTickets,callback){
    var URL = "http://angularairline-plaul.rhcloud.com/api/flightinfo/"+airport+"/"+date.toISOString()+"/"+numbOfTickets;
    request(URL, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            return callback(null,JSON.parse(body));
        } else{
            return callback(error,JSON.parse(body))
        }
    })
};