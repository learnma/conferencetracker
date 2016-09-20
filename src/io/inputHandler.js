/* eslint-disable no-console */
const readline = require('readline');
const Duration = require('../models/duration');
const Event = require('../models/event');

/**
 * A function that abstracts reading of input stream and return array of Events.
 * The inputstream is expected to contain the entries in following format:
 *     Writing Fast Tests Against Enterprise Rails 60min
 *     Overdoing it in Python 45min 
 */
const inputReader = function(stream) {

    let promise = new Promise((resolve) => {
        let events = [];
        const rl = readline.createInterface({
            input: stream
        });

        rl.on('line', line => {
            const regex = /^(.+)\s(\d+)?\s?(min|lightning)$/;
            const result = line.match(regex);

            if (!result) {
                console.error(`ERROR: ${line} does not match the input contract. Ignoring the same`);
                return;
            }

            const name = result[1];
            const details = result[3] === 'lightning' ? 
                                {length: 5, kind: 'lightning'} :
                                {length: parseInt(result[2]), kind: 'normal'};

            const event = new Event(name, new Duration(details.length), details.kind);
            events.push(event);
        });

        rl.on('close', () => {
            resolve(events);
        });

    });

    return promise;

};

module.exports = inputReader;