var module = require('./../lib/index.js');
var path = require('path');
var fs = require("fs");

var directory;
var extension;
var callback;

var tempDirectory = "";

before(function(done){
    directory = path.join(__dirname, 'testFolder');
    extension = "js";
    callback = function (err, list) {
        if (err) {
            return console.error('Error: ' + err);
        }
        list.forEach(function (file) {
            console.log(file);
        });
    };

    tempDirectory = './test/tmp';
    fs.mkdirSync(tempDirectory);
    fs.writeFileSync(tempDirectory+'/file1.js', '');
    fs.writeFileSync(tempDirectory+'/file2.js', '');
    fs.writeFileSync(tempDirectory+'/file3.js', '');
    fs.writeFileSync(tempDirectory+'/file4.html', '');
    done();
});

after(function(done){
    fs.unlinkSync(tempDirectory+'/file1.js');
    fs.unlinkSync(tempDirectory+'/file2.js');
    fs.unlinkSync(tempDirectory+'/file3.js');
    fs.unlinkSync(tempDirectory+'/file4.html');
    fs.rmdirSync(tempDirectory);
    done();
});



describe('Extract all js files from existing directory', function(){
    it('returns an array with all js files from testFolder', function(done) {
        module.fileExtractor(directory,extension,callback);
        done();
        })
    });

describe('Extract all js files from tmp directory', function(){
    it('returns an array with all js files from testFolder', function(done) {
        module.fileExtractor(tempDirectory,extension,callback);
        done();
    })
});

