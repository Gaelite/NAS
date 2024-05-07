const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const HOST = '0.0.0.0';
const PORT = 514;

function parseSyslogMessage(data) {
    // Decodificar el mensaje
    const mensaje = data.toString('utf-8');

    // Encontrar delimitadores, guardarlos como variables
    const colon1Idx = mensaje.indexOf(':') + 22;
    const colon2Idx = mensaje.indexOf(':', colon1Idx + 1) + 1;

    // Usar variables como delimitadores
    const part1 = mensaje.substring(colon1Idx - 19, colon1Idx);
    const part2 = mensaje.substring(colon1Idx + 2, colon2Idx - 1);
    const part3 = mensaje.substring(colon2Idx + 1);

    // Crear objeto JSON, asignar partes a JSON
    const jsonObj = {
        Tiempo: part1,
        Tipo: part2,
        Descripcion: part3
    };

    return jsonObj;
}

// Configurar Socket.IO
io.on('connection', socket => {
    console.log('a user connected');
    // Aquí se puede manejar lo que quieres hacer con la conexión del cliente Socket.IO
});

// Iniciar el servidor HTTP
http.listen(PORT, HOST, () => {
    console.log(`Server listening on ${HOST}:${PORT}`);
});

// Configurar Socket.IO para recibir mensajes syslog
io.on('connection', socket => {
    console.log('a user connected');

    // Bucle para siempre recibir
    const dgram = require('dgram');
    const server = dgram.createSocket('udp4');

    server.on('error', (err) => {
        console.log(`Server error:\n${err.stack}`);
        server.close();
    });

    server.on('message', (data, rinfo) => {
        const jsonStr = JSON.stringify(parseSyslogMessage(data));
        console.log(jsonStr);
        // Emitir el mensaje a través de Socket.IO
        socket.emit('syslogMessage', jsonStr);
    });

    server.on('listening', () => {
        const address = server.address();
        console.log(`Server listening ${address.address}:${address.port}`);
    });

    server.bind(PORT, HOST);
});

