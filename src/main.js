const fs = require('fs');
const inputHandler = require('./io/inputHandler');
const outputHandler = require('./io/outputHandler');
const schedule = require('./scheduler/schedule');

const main = (inputFileName, outputFileName) => {
    const promise = new Promise((resolve, reject) => {

        fs.stat(inputFileName, err => {
            if (err) {
                reject(`${inputFileName} does not exists`);
            }    

            const stream = fs.createReadStream(inputFileName);
            inputHandler(stream).then(events => {
                const conference = schedule(events);
                if (outputFileName) {
                    const outputStream = fs.createWriteStream(outputFileName);
                    outputHandler(outputStream, conference);
                }
                resolve(conference);
            }).catch(err => {
                reject(err);
            });
        });
    });

    return promise;
};

module.exports = main;
