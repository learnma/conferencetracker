const Slot = require('../../../src/models/Slot');
const slotOptimizer = require('../../../src/scheduler/slotOptimizer');
const {evtn} = require('../../util');

const makeMasterEvents = (durations) => {
    let masterEvents = [];
    durations.forEach(lengthInMinutes => {
        masterEvents.push(evtn(lengthInMinutes));
    });
    return masterEvents;
};

const allocateEventsToSlot = (slot, allocatedEventsDuration) => {
    allocatedEventsDuration.forEach(lengthInMinutes => {
        slot.addEvent(evtn(lengthInMinutes));
    });
};

describe('slotOptimizer', () => {

    it('should swap ant event to make the slot full', () => {
        // Arrange
        let events = makeMasterEvents([30, 60, 45, 60]);
        let slot = Slot.newMorningSlot();
        allocateEventsToSlot(slot, [60, 45, 30, 30]);

        // Act
        slotOptimizer(slot, events);

        // Assert
        expect(slot.remainingDuration.lengthInMinutes).toBe(0);
    });

});