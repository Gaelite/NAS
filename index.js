//Para iniciar el servidor web
const http = require('http');

http.createServer(function(req,res){
    res.write("<h1>Hola mundo</h1>");
    res.end();
}).listen(3000)
//Para compilar el codigo poner en consola "node <nombre del archivo>"