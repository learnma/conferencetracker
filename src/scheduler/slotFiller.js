const _ = require('lodash');

const slotFiller = (slot, events) => {
    let slottedEvents = [];
    events.forEach((event) => {
        if (slot.hasRoomFor(event)) {
            slot.addEvent(event);
            slottedEvents.push(event);
        }
    });
    return _.difference(events, slottedEvents);
};

module.exports = slotFiller;
