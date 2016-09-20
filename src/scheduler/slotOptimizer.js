/**
 * slotOptimizer runs through the slot and attempts to swap
 * events from master events array so that there is no gap 
 * in the slot.
 * 
 * Logic:
 * The function iterates over the slot and finds another event
 * from master list that would make it be completely full without
 * any gap. Once sucj event is found it swaps the event.
 * 
 * @slot - slot that needs to be optimized so any tail end gap is minimized
 * @events - master event list from which talks are distributed to slots
 */
const slotOptimizer = (slot, events) => {
    const gapLeft = slot.remainingDuration.lengthInMinutes;
    let run = true;
    var slotEvents = slot.events;
    for (let j=0; j<slotEvents.length && run; j++) {
        let slotEvent = slotEvents[j];
        if (slotEvent.duration.lengthInMinutes < 60) {
            const timeThatWillMakeNoGap = gapLeft + slotEvent.duration.lengthInMinutes;
            if (timeThatWillMakeNoGap <= 60) {
                for (let i=0; i<events.length && run; i++) {
                    if (events[i].duration.lengthInMinutes === timeThatWillMakeNoGap) {
                        slot.replaceEvent(slotEvent, events[i]);
                        events.splice(i, 1, slotEvent);
                        run = false;
                    }
                }
            }
        }
    }
};

module.exports = slotOptimizer;
