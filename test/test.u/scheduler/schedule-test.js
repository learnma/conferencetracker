const {evt} = require('../../util');
const schedule = require('../../../src/scheduler/schedule');

describe('scheduler', () => {

    it('should give schedule for few events', () => {
        // Arrange
        let events = [evt('evt1', 60), evt('evt2', 30), evt('evt3', 45)];

        // Act
        const conference = schedule(events);

        // Assert
        expect(conference.tracks.length).toBe(1);
        expect(conference.tracks[0].slots.length).toBe(3);
        expect(conference.tracks[0].slots[0].events.length).toBe(3);
        expect(conference.tracks[0].slots[1].events.length).toBe(1);
        expect(conference.tracks[0].slots[2].events.length).toBe(1);
    });

});
