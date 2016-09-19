/* eslint-disable no-console */

const inputFileName = process.argv[2];
if (!inputFileName || inputFileName.match(/(-help|-h|--help|-h|\/\?)/)) {
    showUsage();
    process.exit(1);
}

const fs = require('fs');
const readline = require('readline');
const Event = require('./src/models/event');
const events = [];

fs.stat(inputFileName, err => {
    if (err) {
        return console.error(`${inputFileName} does not exists`);
    }    

    const rl = readline.createInterface({
        input: fs.createReadStream(inputFileName)
    });

    rl.on('line', line => {
        const regex = /^(.+)\s(\d+)?\s?(min|lightning)$/;
        const result = line.match(regex);

        if (!result) {
            console.error(`${line} does not match the input contract. Ignoring the same`);
            return;
        }

        const name = result[1];
        const duration = result[3] === 'lightning' ? 
                            {length: 5, unit: 'min', type: 'lightning'} :
                            {length: result[2], unit: 'min', type: 'normal'};

        const event = new Event(name, duration);
        events.push(event);
    });
});
function showUsage() {
    console.log('\nUsage:: \nnode index.js <input>\n');
    console.log('Where::\ninput - filename which has input to the app\n');
    console.log('Example::\nnode index.js ./test/data/default-input.txt\n');
}