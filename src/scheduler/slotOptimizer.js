const slotOptimizer = (slot, events) => {
    console.log('----- running slot optimizer for ' + slot.name + '----------');
    const gapLeft = slot.remainingDuration.lengthInMinutes;
    console.log('gap left ' + gapLeft);
    var slotEvents = slot.events;
    slotEvents.forEach(slotEvent => {
        if (slotEvent.duration.lengthInMinutes < 60) {
            const timeThatWillMakeNoGap = gapLeft + slotEvent.duration.lengthInMinutes;
            console.log(slotEvent.name + ' ' + timeThatWillMakeNoGap);
            if (timeThatWillMakeNoGap <= 60) {
                for (let i=0; i<events.length; i++) {
                    console.log('avilable event[' + i + '] length ' + events[i].duration.lengthInMinutes);
                    if (events[i].duration.lengthInMinutes === timeThatWillMakeNoGap) {
                        console.log(`****** in ${slot.name} replacing ${slotEvent.name} with ${events[i].name} will optimize`);
                        return;
                    }
                }
            }
        }
    });
};

module.exports = slotOptimizer;