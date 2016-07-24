var http = require('http');
var fs = require('fs');

http.createServer(function (request, response) {
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write(fs.readFileSync("home.html"));
    response.end();
}).listen(80);

console.log('Server running at http://127.0.0.1/');
