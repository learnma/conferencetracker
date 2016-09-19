const fs = require('fs');
const inputHandler = require('./io/inputHandler');
const schedule = require('./scheduler/schedule');

const main = (inputFileName) => {
    const promise = new Promise((resolve, reject) => {

        fs.stat(inputFileName, err => {
            if (err) {
                reject(`${inputFileName} does not exists`);
            }    

            const stream = fs.createReadStream(inputFileName);
            inputHandler(stream).then(events => {
                const conference = schedule(events);
                resolve(conference);
            }).catch(err => {
                reject(err);
            });
        });
    });

    return promise;
};

module.exports = main;
