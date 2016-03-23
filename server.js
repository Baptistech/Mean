var http = require('http');

//Instantiaton d'un serveur qui retourne systematiquement
//"Hello" (quelque soit la requette)
var server = http.createServer(function (request, response) {
  response.write('<h1> Hello </h1>');
  response.end();
});

server.listen(3000);

//Instantiation d'un serveur qui retourne son propre code source
//Ici la requete et la response sont considérés comme des streams

var fs = require('fs');

var server2 = http.createServer();

server2.on('request', function (req, res) {
  fs.createReadStream('server.js').pipe(res);
});

server2.listen(3001);
