const inputHandler = require('../../../src/io/inputHandler');
const {evt, levt} = require('../../util');

describe('inputHandler', () => {

    it('should read single event', (done) => {
       // Arrange
        const MemoryStream = require('memorystream');
        const stream = new MemoryStream(['event1 60min\n'], {writable : false});

        // Act
        let promise = inputHandler(stream);

        // Assert
        promise.then(events => {
            expect(events).toEqual([evt('event1', 60)]);
            done();
        });
    });

    it('should read two event', (done) => {
       // Arrange
        const MemoryStream = require('memorystream');
        const stream = new MemoryStream(['event1 60min\n', 'event2 lightning'], {writable : false});

        // Act
        let promise = inputHandler(stream);

        // Assert
        promise.then(events => {
            expect(events).toEqual([evt('event1', 60), levt('event2')]);
            done();
        });
    });

    it('should parse correctly events with spaces', (done) => {
       // Arrange
        const MemoryStream = require('memorystream');
        const stream = new MemoryStream(['event with spaces 60min\n'], {writable : false});

        // Act
        let promise = inputHandler(stream);

        // Assert
        promise.then(events => {
            expect(events).toEqual([evt('event with spaces', 60)]);
            done();
        });
    });

    it('should parse correctly events with tabs', (done) => {
       // Arrange
        const MemoryStream = require('memorystream');
        const stream = new MemoryStream(['event with     tabs 60min\n'], {writable : false});

        // Act
        let promise = inputHandler(stream);

        // Assert
        promise.then(events => {
            expect(events).toEqual([evt('event with     tabs', 60)]);
            done();
        });
    });

    it('should skip the wrong data and process others', (done) => {
       // Arrange
        const MemoryStream = require('memorystream');
        const stream = new MemoryStream(['wrong input event\n', 'event next to wrong one 45min'], {writable : false});

        // Act
        let promise = inputHandler(stream);

        // Assert
        promise.then(events => {
            expect(events).toEqual([evt('event next to wrong one', 45)]);
            done();
        });
    });

});
