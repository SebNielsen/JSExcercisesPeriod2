var module = require('../lib/index');
var nock = require('nock');
var expect = require('chai').expect;

var airport = 'SXF';
var date = new Date("2016-03-09");
var numTickets = 4;

before(function(done){
    nock('http://angularairline-plaul.rhcloud.com')
        .get('/api/flightinfo/' + airport + '/' + date.toISOString() + '/' + numTickets)
        .reply(200, {
            airline: 'AngularJS Airline',
            flights: [
                {
                    flightID: 'COL2215x100x2016-03-09T08:00:00.000Z',
                    numberOfSeats: 4,
                    date: '2016-03-09T08:00:00.000Z',
                    totalPrice: 340,
                    travelTime: 60,
                    origin: 'SXF',
                    destination: 'MAD'
                }
            ]
        });
    done();
});

describe('Testing getAvailableTickets method', function () {
    it('returns a response with flightInfo', function(done){
        module.getAvailableTickets(airport, date, numTickets, function(err, flightInfo){
            expect(flightInfo.airline).to.be.a('string');
            expect(flightInfo.flights.length).to.equal(1);
            expect(flightInfo.flights[0].origin).to.equal('SXF');
            expect(flightInfo.flights[0].destination).to.equal('MAD');
            done();
        })
    })
});