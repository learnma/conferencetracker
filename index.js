/* eslint-disable no-console */

const inputFileName = process.argv[2] || './test/test.i/data/default-input.txt';
if (!inputFileName || inputFileName.match(/(-help|-h|--help|-h|\/\?)/)) {
    showUsage();
    process.exit(1);
}
const outputFileName = process.argv[2] || './test/test.i/data/default-output.txt';

const main = require('./src/main');
main(inputFileName, outputFileName).then(conference => {
    if (conference) {
        const tracks = conference.tracks;
        tracks.forEach(track => {
            console.log(`\n${track.name} :: `);
            for (const key in track.schedule) {
                console.log(`${key} ${track.schedule[key]}`);
            }
        });
    }
});

function showUsage() {
    console.log('\nUsage:: \nnode index.js <input> <output>\n');
    console.log('Where::\ninput - filename which has input to the app\n');
    console.log('Where::\output - filename where output should be written\n');
    console.log('Example::\nnode index.js ./test/test.i/data/default-input.txt ./test/test.i/data/default-output.txt\n');
}