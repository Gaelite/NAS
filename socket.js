const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Manejar conexiones de clientes
io.on('connection', (socket) => {
    console.log('Cliente conectado:', socket.id);

    // Manejar evento 'message' del cliente
    socket.on('message', (data) => {
        console.log('Datos recibidos:', data);
        // Reenviar los datos a todos los clientes conectados (excepto al que envió el mensaje)
        socket.broadcast.emit('message', data);
    });

    // Manejar eventos de cierre de conexión
    socket.on('disconnect', () => {
        console.log('Cliente desconectado:', socket.id);
    });
});

// Manejar errores de servidor
server.on('error', (error) => {
    console.error('Error en el servidor:', error.message);
});

// Escuchar conexiones en el puerto especificado
server.listen(3000, () => {
    console.log('Servidor Socket.IO escuchando en el puerto 3000...');
});
