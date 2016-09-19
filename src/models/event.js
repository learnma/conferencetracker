const Duration = require('./duration');

class Event {

    constructor(name, duration, kind='normal') {
        this._name = name;
        this._duration = duration;
        this._kind = kind;
    }

    get name() {
        return this._name;
    }

    get duration() {
        return this._duration;
    }

    get displayString() {
        switch (this._kind) {
        case 'normal':
            return `${this._name} ${this._duration.lengthInMinutes}min`;
        case 'lightning':
            return `${this._name} lightning`;
        case 'break':
        case 'networking':
            return `${this._name}`;
        }
    }

    static new(name, lengthInMinutes, kind='normal') {
        return new Event(name, 
                         Duration.createEventDuration(lengthInMinutes), 
                         kind);
    }
}

module.exports = Event;