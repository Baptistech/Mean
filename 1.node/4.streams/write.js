var stream = require('stream'),
    Writable = stream.Writable,
    writeStream = new Writable(),
    incr = require('./read');

var i = 0;

writeStream._write = function (chunk, encoding, next) {
  console.log(chunk.toString());
  if (i++ < 10); next();
};

incr.pipe(writeStream);
