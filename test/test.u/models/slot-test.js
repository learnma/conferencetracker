const moment = require('moment');
const {createSlotDuration, createEventDuration} = require('../../../src/models/duration');
const Event = require('../../../src/models/event');
const Slot = require('../../../src/models/slot');
const {evt} = require('../../util');

describe('Slot', () => {

    it('should accomodate single event', () => {
        const startTime = moment({hour: 9});

        const slot = new Slot(startTime, createSlotDuration(180));
        const event = new Event('event1', createEventDuration(60));

        expect(slot.hasRoomFor(event)).toBe(true);
    });

    it('should reduce the remaining duration', () => {
        const startTime = moment({hour: 9});

        const slot = new Slot(startTime, createSlotDuration(180));
        const event = Event.new('event1', 60);

        slot.addEvent(event);

        expect(slot.remainingDuration).toEqual(createSlotDuration(120));
    });

    it('should say "no room" for event larger than avilable slot', () => {
        const startTime = moment({hour: 9});

        const slot = new Slot(startTime, createSlotDuration(90));
        const event1 = Event.new('event1', 60);
        const event2 = Event.new('event2', 60);

        slot.addEvent(event1);

        expect(slot.hasRoomFor(event2)).toBe(false);
    });

    it('should throw exception for adding an event that cannot be fit-in', () => {
        const startTime = moment({hour: 9});

        const slot = new Slot(startTime, createSlotDuration(90));
        const event1 = Event.new('event1', 60);
        const event2 = Event.new('event2', 60);

        slot.addEvent(event1);
        const fn = slot.addEvent.bind(slot, event2);

        expect(fn).toThrowError('not enough room to fit this event: ' + event2.name);
    });

    it('should able to add event that fits-in subsequently', () => {
        const startTime = moment({hour: 9});

        const slot = new Slot(startTime, createSlotDuration(90));
        const event1 = Event.new('event1', 60);
        const event2 = Event.new('event2', 60);
        const event3 = Event.new('event3', 30);

        slot.addEvent(event1);
        
        expect(slot.hasRoomFor(event2)).toBe(false);
        expect(slot.hasRoomFor(event3)).toBe(true);
        slot.addEvent(event3);
        expect(slot.events).toEqual([evt('event1', 60), evt('event3', 30)]);
    });

    it('should be able to accomodate enough events in morning slot', () => {
        // Arrange
        let events = [evt('evt1', 60), evt('evt2', 30), evt('evt3', 45)];
        let slot = Slot.newMorningSlot();

        // Act
        events.forEach(event => slot.addEvent(event));

        // Assert
        expect(slot.events.length).toBe(3);
    });

    it('should return correct display string for morning slot', () => {
        // Arrange
        let events = [evt('evt1', 60), evt('evt2', 30), evt('evt3', 45)];
        let slot = Slot.newMorningSlot();

        // Act
        events.forEach(event => slot.addEvent(event));

        // Assert
        const expected = {'09:00AM':'evt1 60min', '10:00AM':'evt2 30min', '10:30AM':'evt3 45min'};
        expect(slot.schedule).toEqual(expected);
    });

    it('should return correct display string for noon slot', () => {
        // Arrange
        let events = [evt('evt1', 60), evt('evt2', 30), evt('evt3', 45)];
        let slot = Slot.newNoonSlot();

        // Act
        events.forEach(event => slot.addEvent(event));

        // Assert
        const expected = {'01:00PM':'evt1 60min', '02:00PM':'evt2 30min', '02:30PM':'evt3 45min'};
        expect(slot.schedule).toEqual(expected);
    });

});