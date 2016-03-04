var chai = require('chai');
var expect = chai.expect;
var module = require('./../lib/index');

describe('Calculate', function(){
   it('returns the sum of the numbers after a plus operation', function(){
       var result = module.calculate("plus", 2, 2);

       expect(result).to.equal(4);
       expect(result).to.be.a('number');
   });


    it('returns the sum of the numbers after a multiply operation', function(){
        var result = module.calculate("multiply", 10, 2);

        expect(result).to.equal(20);
    });

    it('returns the sum of the numbers after a minus operation', function(){
        var result = module.calculate("minus", 10, 2);

        expect(result).to.equal(8);
    });

    it('returns an error after a divide operation with zero', function(){
        expect(module.calculate.bind(module, "divide", 2, 0)).to.throw("Attempt to divide by zero");
    });

    it('returns the sum of the numbers  after a divide operation', function(){
        var result = module.calculate("divide", 10, 2);
        expect(result).to.equal(5);
    });

    it('returns nothing when hit default', function(){
        var result = module.calculate("hall", 10, 2);
        expect(result).to.be.a("undefined");
    });

});

describe('Get random Joke', function(){
    it('returns a random joke from my own api', function(done){
        module.joke(function(reply){
            console.log(reply);
            done();
        })
    })
});