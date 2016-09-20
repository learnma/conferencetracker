const _ = require('lodash');

/**
 * This function abstracts the logic of filling the slot with events. 
 * Basically it checks if the slot has for a given event and add it 
 * to the slot.
 * 
 * The assigned slots are removed form the master events array.
 */
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
