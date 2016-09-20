
/**
 * TODO
 *
 */
const outputHandler = function(stream, conference) {
    if (conference) {
        const tracks = conference.tracks;
        tracks.forEach(track => {
            stream.write(`\n${track.name} :: \n`, 'utf-8');
            for (const key in track.schedule) {
                stream.write(`${key} ${track.schedule[key]}\n`, 'utf-8');
            }
        });
    }
};

module.exports = outputHandler;
