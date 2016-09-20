/**
 * slotOptimizer runs through the slot and attempts to swap
 * events from master events array so that there is no gap 
 * in the slot
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
