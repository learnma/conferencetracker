const _ = require('lodash');
const moment = require('moment');
const main = require('../../src/main');

describe('schedule', () => {

    it('should print for typical input', (done) => {
        const promise = main(__dirname + '/data/default-input.txt');
        promise.then(conference => {
            expect(conference.schedule.length).toBe(2);
            let track1 = conference.schedule[0].schedule;
            let track2 = conference.schedule[1].schedule;
            let allevents = _.values(track1).concat(_.values(track2));

            // all events including lunch and networking should be covered
            expect(allevents.length).toBe(23);

            // ensure no duplication of events
            expect(_.uniq(allevents).length).toBe(21);

            // ensure the timings are right for tracks
            expect(checkTimingsForTrack(track1)).toBe(true);
            expect(checkTimingsForTrack(track2)).toBe(true);

            // ensure lunch is at 12:00 PM
            expect(track1['12:00PM']).toBe('Lunch');
            expect(track2['12:00PM']).toBe('Lunch');

            done();
        }).catch(err => {
            console.error(err); // eslint-disable-line
            expect(false);
            done();
        });
    });

});

function checkTimingsForTrack(track) {
    let expectedStartTime = moment({hour: '9'});
    for (const startTimeStr in track) {
        const event = track[startTimeStr];
        const startTime = moment(startTimeStr, 'hh:mmA');
        
        //expect(expectedStartTime.diff(startTime)).toBe(0);
        if (expectedStartTime.diff(startTime) !== 0) {
            console.log(`-- WARNING:: expected start of ${event} was ${expectedStartTime.format('hh:mmA')} but it is ${startTime.format('hh:mmA')}`); // eslint-disable-line
            if (event !== 'Lunch' && startTime.format('hh:mmA') !== '12:00PM') {
                return false;
            }
            expectedStartTime = startTime;
        }

        let minsToAdd;
        if (event === 'Lunch') {
            minsToAdd = 60;
        } else if (event === 'Networking') {
            // ensure networking falls between 4 - 5
            const t1 = moment({hour: '16'});
            const t2 = moment({hour: '17'});
            const fallsInRange = startTime.isBetween(t1, t2, null, '[]');
            if (!fallsInRange) {
                console.log('-- networking is not in - between 4PM to 5PM'); // eslint-disable-line
                return false;
            }
        }
        else {
            const regex = /^(.+)\s(\d+)?\s?(min|lightning)$/;
            const result = event.match(regex);
            minsToAdd = result[3] === 'lightning' ? 5 : parseInt(result[2]);
        }

        expectedStartTime = expectedStartTime.add(minsToAdd, 'minutes');
    }
    return true;
}