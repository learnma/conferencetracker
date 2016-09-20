const Slot = require('../models/slot');
const Event = require('../models/event');
const Track = require('../models/track');
const Conference = require('../models/conference');

const slotFiller = require('./slotFiller');
const slotOptimizer = require('./slotOptimizer');

/**
 * The schedule function is the core logic where events are scheduled. The 
 * following logic is applied to schedule the talks:
 *      The events array is passed as input to scheduler
 *      The lightning talks are seperated from main events array
 *      The scheduler run until all main events are allocated
 *      The scheduler create tracks and assign slots to tracks
 *      The track has morning slot, lunch slot and noon slot
 *      As events are iterated, a slot is created and events are assigned to iterated
 *      If a slot has a gap, an optimizer is run to change events to fill the slot
 *      If slot has more room, the lightining event is added
 *      Finally networking event is assigned for noon tasks
 */
const schedule = events => {

    // Create a conference
    const conference = new Conference();
    let trackId = 1;

    let lightningEvents = events.filter(event => event.kind === 'lightning');
    events = events.filter(event => event.kind !== 'lightning');

    // Iterate as long as there is an event to schedule
    while (events.length != 0) {
        // Create a track
        const track = new Track(`Track ${trackId++}`);

        // Create and fill morning slot
        const morningSlot = Slot.newMorningSlot();
        events = slotFiller(morningSlot, events);
        if (morningSlot.hasRoomLeft() && events.length > 0) {
            slotOptimizer(morningSlot, events);
        }
        lightningEvents = slotFiller(morningSlot, lightningEvents);
        track.addSlot(morningSlot);

        // Create lunch slot
        const lunchSlot = Slot.newLunchSlot();
        lunchSlot.addEvent(Event.new('Lunch', 60, 'break'));
        track.addSlot(lunchSlot);

        // Create and fill noon slot
        const noonSlot = Slot.newNoonSlot();
        events = slotFiller(noonSlot, events);
        if (noonSlot.hasRoomLeft() && events.length > 0) {
            slotOptimizer(noonSlot, events);
        }
        lightningEvents = slotFiller(noonSlot, lightningEvents);
        noonSlot.addNetworkingEvent(Event.new('Networking', 30, 'networking'));
        track.addSlot(noonSlot);

        // Add track to the conference
        conference.addTrack(track);
    }

    lightningEvents.forEach(lightningEvent => {
        console.error('WARNING:: Could not accomodate lightning talk "' + lightningEvent.name + '"'); // eslint-disable-line
    });

    return conference;
};

module.exports = schedule;
