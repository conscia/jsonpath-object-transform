var expect = require('chai').expect;
var transform = require('..');

describe('JSOMPath Object Transform', function () {

    var template = {
        foo: ['$.some.crazy', {
            bar: '$.example'
        }]
    };

    var data = {
        some: {
            crazy: [
                {
                    example: 'A'
                },
                {
                    example: 'B'
                }
            ]
        }
    };

    it('should transform json', function () {
        expect(transform(data, template)).to.deep.equal(
            {
                foo: [
                    {
                        bar: 'A'
                    },
                    {
                        bar: 'B'
                    }
                ]
            });
    });
});


describe('Cities', function () {

    var cities_payload = {
        "cities": [
            {"city": "Toronto", "population": 2.5},
            {"city": "New York", "population": 8.1},
            {"city": "San Diego", "population": 1.6},
            {"city": "Seattle", "population": 0.65}
        ]
    };


    it('transformation #1', function () {

        // works
        var template = {
            bigCities: ["$.cities[?(@.population > 2)]"]
        };

        expect(transform(cities_payload, template)).to.deep.equal({
            "bigCities": [
                {
                    "city": "Toronto",
                    "population": 2.5
                },
                {
                    "city": "New York",
                    "population": 8.1
                }
            ]
        });
    });

    it('transformation #2', function () {

        // works
        var template = {
            bigCities: ["$.cities", {"name": "city"}]
        };

        expect(transform(cities_payload, template)).to.deep.equal({
            "bigCities": [
                {
                    "name": "Toronto"
                },
                {
                    "name": "New York"
                },
                {
                    "name": "San Diego"
                },
                {
                    "name": "Seattle"
                }
            ]
        });
    });

    it('transformation #3', function () {

        // works
        var template = {
            bigCities: ["$.cities[?(@.population > 2)]", {name: "city"}]
        };

        expect(transform(cities_payload, template)).to.deep.equal({
            "bigCities": [
                {
                    "name": "Toronto"
                },
                {
                    "name": "New York"
                }
            ]
        });
    });


});