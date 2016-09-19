class Track {

    constructor(name) {
        this._name = name;
        this._slots = [];
    }

    get name() {
        return this._name;
    }

    addSlot(slot) {
        this._slots.push(slot);
    }

    get slots() {
        return this._slots;
    }

    get schedule() {
        let schedule = {};
        this._slots.forEach(slot => {
            schedule = Object.assign(schedule, slot.schedule);
        });
        return schedule;
    }

}

module.exports = Track;
