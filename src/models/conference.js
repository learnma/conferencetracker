
class Conference {

    constructor(name, startdate, enddate) {
        this._name = name;
        this._startdate = startdate;
        this._enddate = enddate;
        this._tracks = [];
    }

    get name() {
        return this.name;
    }

    addTrack(track) {
        this._tracks.push(track);
    }

    get tracks() {
        return this._tracks;
    }

    get schedule() {
        var tracks = [];
        this._tracks.forEach(track => {
            var trackInfo = {
                name: track.name,
                schedule: track.schedule
            };
            tracks.push(trackInfo);
        });
        return tracks;
    }
}

module.exports = Conference;
