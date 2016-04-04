var fs = require('fs');

fs.readFile(__dirname + '/files/hello.html', function (err, data) {
    if (err) {
        console.log(err);
    }else{
        console.log(data.toString());
    }
});
console.log('Lecture du fichier:');
