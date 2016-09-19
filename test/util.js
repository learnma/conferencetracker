const Duration = require('../src/models/duration');
const Event = require('../src/models/event');

module.exports = {
    evt: (name, length) => new Event(name, new Duration(length), 'normal'),
    levt: (name) => new Event(name, new Duration(5), 'lightning')
};