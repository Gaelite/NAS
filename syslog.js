const net = require('net');

// Configuración del servidor TCP
const tcpHost = '127.0.0.1';  // Dirección IP del servidor TCP
const tcpPort = 12345;         // Puerto del servidor TCP

// Configuración del cliente Kiwi
const kiwiHost = '192.168.16.100'; // Dirección IP del servidor Kiwi
const kiwiPort = 5000;         // Puerto del servidor Kiwi

// Lista de clientes conectados
const clients = [];

// Crear servidor TCP
const server = net.createServer((socket) => {
    console.log('Cliente conectado desde: ' + socket.remoteAddress + ':' + socket.remotePort);

    // Agregar cliente a la lista
    clients.push(socket);

    // Manejar datos recibidos del cliente
    socket.on('data', (data) => {
        try {
            const receivedData = JSON.parse(data.toString()); // Convertir datos recibidos a objeto JavaScript
            console.log('Datos recibidos del cliente:', receivedData);

            // Procesar datos recibidos
            switch (receivedData.command) {
                case 'hello':
                    // Enviar mensaje de respuesta al cliente
                    socket.write('Hola, cliente.\r\n');
                    break;
                case 'broadcast':
                    // Enviar mensaje a todos los clientes
                    clients.forEach((client) => {
                        client.write(JSON.stringify({ from: 'Servidor TCP', message: '¡Este es un mensaje de difusión!' }));
                    });
                    break;
                default:
                    // Comando desconocido, enviar mensaje de error al cliente
                    socket.write('Comando desconocido.\r\n');
                    break;
            }
        } catch (error) {
            console.error('Error al procesar datos recibidos:', error.message);
            socket.write('Error al procesar datos recibidos.\r\n');
        }
    });

    // Manejar eventos de cierre de conexión
    socket.on('close', () => {
        console.log('Cliente desconectado.');
        // Eliminar cliente de la lista
        const index = clients.indexOf(socket);
        if (index !== -1) {
            clients.splice(index, 1);
        }
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

    // Enviar mensaje de conexión al servidor Kiwi
    kiwiClient.write(JSON.stringify({ from: 'Servidor TCP', message: '¡Hola, Kiwi!' }));
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
