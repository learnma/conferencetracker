const _ = require('lodash');
const Duration = require('../src/models/duration');
const Event = require('../src/models/event');

module.exports = {
    evtn: length => new Event(`event-${_.uniqueId()}`, new Duration(length), 'normal'),
    evt: (name, length) => new Event(name, new Duration(length), 'normal'),
    levt: (name) => new Event(name, new Duration(5), 'lightning')
};