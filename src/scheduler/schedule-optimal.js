const Slot = require('../models/slot');
const Event = require('../models/event');
const Track = require('../models/track');
const Conference = require('../models/conference');

const slotFiller = require('./slotFiller');

const schedule = events => {

    // Create a conference
    const conference = new Conference();
    let trackId = 1;

    let smallEvents = events.filter(event => event.duration.lengthInMinutes <= 15);
    events = events.filter(event => event.duration.lengthInMinutes > 15);
    let possibleSlots = [];
    let noonSlots = [];
    
    // Iterate as long as there is an event to schedule
    while (events.length !== 0) {
        // Create a track
        const track = new Track(`Track ${trackId++}`);

        // Create and fill morning slot
        const morningSlot = Slot.newMorningSlot();
        events = slotFiller(morningSlot, events);
        track.addSlot(morningSlot);
        if (morningSlot.hasRoomLeft()) {
            possibleSlots.push(morningSlot);
        }

        // Create lunch slot
        const lunchSlot = Slot.newLunchSlot();
        lunchSlot.addEvent(Event.new('Lunch', 60, 'break'));
        track.addSlot(lunchSlot);

        // Create and fill noon slot
        const noonSlot = Slot.newNoonSlot();
        events = slotFiller(noonSlot, events);
        //noonSlot.addNetworkingEvent(Event.new('Networking', 30, 'networking'));
        track.addSlot(noonSlot);
        if (noonSlot.hasRoomLeft()) {
            possibleSlots.push(noonSlot);
        }
        noonSlots.push(noonSlot);

        // Add track to the conference
        conference.addTrack(track);
    }

    // now fill in smaller events
    if (smallEvents.length !== 0) {
        possibleSlots.forEach(slot => {
            smallEvents = slotFiller(slot, smallEvents);
        });
    }

    noonSlots.forEach(noonSlot => {
        noonSlot.addNetworkingEvent(Event.new('Networking', 30, 'networking'));
    });

    // FIXME: WHAT IF smallevents are still not filled?

    return conference;
};

module.exports = schedule;
