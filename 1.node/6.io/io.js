process.stdin.setEncoding('utf8');

process.stdin.on('data', function (chunk) {
  process.stdout.write('chunk:' + chunk.toString());
});

process.stdin.on('end', function () {
  process.stdout.write('end');
});

var transform = require('stream').Transform();
trans._transform = function (chunk, enc, done) {
    this.push(chunk.toString().split('').map(function (char) {
        return String.fromCharCode(char.toUpperCase());
    }).join(''));
    done();
};

process.stdin.pipe(transform).pipe(process.stdout);
