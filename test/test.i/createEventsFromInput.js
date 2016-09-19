const fs = require('fs');
const inputHandler = require('../../src/io/inputHandler');
const {evt} = require('../util');

describe('create Events from input', () => {
    it('should return right result', (done) => {
        const stream = fs.createReadStream(__dirname + '/data/oneline-input.txt');
        const promise = inputHandler(stream);
        promise.then(events => {
            expect(events).toEqual([evt('Writing Fast Tests Against Enterprise Rails', 60)]);
            done();
        });
    });
});