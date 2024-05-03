const net = require('net');

// Configuración del servidor TCP
const tcpHost = '127.0.0.1';  // Dirección IP del servidor TCP
const tcpPort = 12345;         // Puerto del servidor TCP

// Configuración del cliente Kiwi
const kiwiHost = '192.168.16.100'; // Dirección IP del servidor Kiwi
const kiwiPort = 5000;         // Puerto del servidor Kiwi

// Crear servidor TCP
const server = net.createServer((socket) => {
    console.log('Cliente conectado desde: ' + socket.remoteAddress + ':' + socket.remotePort);

    // Manejar datos recibidos del cliente
    socket.on('data', (data) => {
        try {
            const receivedData = JSON.parse(data.toString()); // Convertir datos recibidos a objeto JavaScript
            console.log('Datos recibidos del cliente:', receivedData);

            // Hacer algo con los datos recibidos (en este caso, enviar una respuesta al cliente)
            socket.write('Datos recibidos correctamente.\r\n');
        } catch (error) {
            console.error('Error al procesar datos recibidos:', error.message);
            socket.write('Error al procesar datos recibidos.\r\n');
        }

        // Cerrar la conexión con el cliente
        socket.end();
    });

    // Manejar eventos de cierre de conexión
    socket.on('close', () => {
        console.log('Cliente desconectado.');
    });

    // Manejar errores de conexión
    socket.on('error', (error) => {
        console.error('Error de conexión:', error.message);
    });
});

// Manejar errores de servidor
server.on('error', (error) => {
    console.error('Error en el servidor:', error.message);
});

// Escuchar conexiones en el puerto especificado
server.listen(tcpPort, tcpHost, () => {
    console.log(`Servidor TCP escuchando en ${tcpHost}:${tcpPort}`);
});

// Conectar al servidor Kiwi como cliente
const kiwiClient = net.createConnection({ host: kiwiHost, port: kiwiPort }, () => {
    console.log(`Conectado al servidor Kiwi en ${kiwiHost}:${kiwiPort}`);
});

// Manejar eventos del cliente Kiwi
kiwiClient.on('data', (data) => {
    console.log('Datos recibidos del servidor Kiwi:', data.toString());
});

kiwiClient.on('end', () => {
    console.log('Desconectado del servidor Kiwi');
});

kiwiClient.on('error', (error) => {
    console.error('Error de conexión con el servidor Kiwi:', error.message);
});
