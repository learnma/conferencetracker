
class Duration {

    constructor(lengthInMinutes) {
        this._lengthInMinutes = lengthInMinutes;
    }

    get lengthInMinutes() {
        return this._lengthInMinutes;
    }

    reduceLengthBy(duration) {
        this._lengthInMinutes -= duration.lengthInMinutes;
    }

    canYouAccomodate(duration) {
        return this._lengthInMinutes >= duration.lengthInMinutes;
    }

    addDuration(time) {
        return time.add(this._lengthInMinutes, 'minutes');
    }

    toString() {
        return `${this._lengthInMinutes}min`;
    }

    static createSlotDuration(lengthInMinutes) {
        return new Duration(lengthInMinutes);
    }

    static createEventDuration(lengthInMinutes) {
        if (lengthInMinutes < 5 && lengthInMinutes > 60) {
            throw new Error(`${lengthInMinutes} is not a valid length for an Event`);
        }
        return new Duration(lengthInMinutes);
    }
}

module.exports = Duration;
