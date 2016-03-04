var module = require('./../lib/index.js');
var path = require('path');
var fs = require("fs");

describe('Extract all js files ex 1', function(){
    it('returns an array with all js files from testFolder', function(done) {

        var directory = path.join(__dirname, 'testFolder');
        var extension = "js";
        var callback = function (err, list) {
            if (err) {
                return console.error('Error: ' + err);
            }
            list.forEach(function (file) {
                console.log(file);
            });
        };

        module.fileExtractor(directory,extension,callback);
        done();
        })
    });

