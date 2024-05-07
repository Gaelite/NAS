const dgram = require('dgram');
const server = dgram.createSocket('udp4');

const HOST = '192.168.0.18';
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

// Configurar el servidor UDP para manejar mensajes syslog
server.on('error', (err) => {
    console.log(`Server error:\n${err.stack}`);
    server.close();
});

server.on('message', (data, rinfo) => {
    const jsonStr = JSON.stringify(parseSyslogMessage(data));
    console.log(jsonStr);
    // Si deseas, puedes agregar la lógica aquí para emitir el mensaje a través de Socket.IO
});

server.on('listening', () => {
    const address = server.address();
    console.log(`Server listening ${address.address}:${address.port}`);
});

// Enlazar el servidor UDP al puerto 514
server.bind(PORT, HOST);