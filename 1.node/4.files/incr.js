var stream = require('stream');

var x = 0;
var readStream = new stream.Readable();

readStream._read = function () {
    if (x < 100) {
        x++;
        this.push('' + x);
    } else {
        this.push(null);
    }
};

module.exports = readStream;

//readStream.pipe(process.stdout);
//process.stdout.on('error', process.exit);
