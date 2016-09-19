const moment = require('moment');
const Duration = require('./duration');

const MORNING_SLOT_START_TIME = moment({hour: 9});
const MORNING_SLOT_DURATION = Duration.createSlotDuration(180);
const LUNCH_SLOT_START_TIME = MORNING_SLOT_DURATION.addDuration(moment(MORNING_SLOT_START_TIME));
const LUNCH_SLOT_DURATION = Duration.createSlotDuration(60);
const NOON_SLOT_START_TIME = LUNCH_SLOT_DURATION.addDuration(moment(LUNCH_SLOT_START_TIME));
const NOON_SLOT_DURATION = Duration.createSlotDuration(240);

class Slot {

    constructor(startTime, duration) {
        this._startTime = startTime;
        this._duration = duration;
        this._events = [];
        this._closed = false;
    }

    hasRoomFor(event) {
        return this._duration.canYouAccomodate(event.duration);
    }

    addEvent(event) {
        if (!this.hasRoomFor(event) || this._closed) {
            throw new Error('not enough room to fit this event: ' + event.name);
        }

        this._events.push(event);
        this._duration.reduceLengthBy(event.duration);
    }

    addNetworkingEvent(event) {
        this._events.push(event);
        this._closed = true;
    }

    get remainingDuration() {
        return this._duration;
    }

    get events() {
        return this._events;
    }

    get schedule() {
        let schedule = {};
        let time = this._startTime;
        this._events.forEach(event => {
            schedule[time.format('hh:mmA')] = event.displayString;
            time = moment(time).add(event._duration.lengthInMinutes, 'minutes');
        });
        return schedule;
    }

    static new(startTime, lengthInMinutes) {
        return new Slot(startTime, Duration.newDurationForSlot(lengthInMinutes));
    }

    static newMorningSlot() {
        // Always make a copy duration
        const duration = Duration.createSlotDuration(MORNING_SLOT_DURATION.lengthInMinutes); 
        return new Slot(MORNING_SLOT_START_TIME, duration);
    }

    static newLunchSlot() {
        const duration = Duration.createSlotDuration(LUNCH_SLOT_DURATION.lengthInMinutes);
        return new Slot(LUNCH_SLOT_START_TIME, duration);
    }

    static newNoonSlot() {
        const duration = Duration.createSlotDuration(NOON_SLOT_DURATION.lengthInMinutes); 
        return new Slot(NOON_SLOT_START_TIME, duration);
    }
}

module.exports = Slot;
