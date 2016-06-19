var expect = require('chai').expect;
var transform = require('../lib/jsonpath-object-transform');

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
    })

});