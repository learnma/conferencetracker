const moment = require('moment');
const slotFiller = require('../../../src/scheduler/slotFiller');
const Duration = require('../../../src/models/duration');
const Slot = require('../../../src/models/Slot');
const {evt} = require('../../util');

describe('slotFiller', () => {

    it('should fill and return remianing events', () => {
        // Arrange
        let events = [evt('event1', 60), evt('event2', 60), evt('event3', 30)];
        const slot = new Slot(moment({hour: 9}), Duration.createSlotDuration(90));

        // Act
        events = slotFiller(slot, events);

        // Assert
        expect(events).toEqual([evt('event2', 60)]);
    });

    it('should give right remianing duration', () => {
        // Arrange
        let events = [evt('event1', 60)];
        const slot = new Slot(moment({hour: 9}), Duration.createSlotDuration(90));

        // Act
        events = slotFiller(slot, events);

        // Assert
        expect(slot.remainingDuration).toEqual(Duration.createSlotDuration(30));

    });

    it('should return empty events back, if all are assigned to slot', () => {
        // Arrange
        let events = [evt('evt1', 60), evt('evt2', 30), evt('evt3', 45)];
        const morningSlot = Slot.newMorningSlot();

        // Act
        events = slotFiller(morningSlot, events);

        // Assert
        expect(events).toEqual([]);
    });

});