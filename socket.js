const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const dgram = require('dgram');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Telegram setup
function sendTelegramMessage(message) {
  // Aquí colocarías tu lógica para enviar un mensaje a Telegram
  console.log("Mensaje enviado a Telegram:", message);
}

// Syslog server config
const HOST = '0.0.0.0';
const PORT = 1514;

// Start syslog server
const syslogServer = dgram.createSocket('udp4');

syslogServer.on('error', (err) => {
  console.error(`Error in syslog server: ${err.stack}`);
  syslogServer.close();
});

syslogServer.on('message', (msg, rinfo) => {
  const messageStr = msg.toString();
  
  // Rough filter for syslog messages
  if (!messageStr.includes("%")) {
    return;
  }
  
  // Obtain severity level from the syslog messages
  const severity = parseInt(messageStr.split('-')[1].split(':')[0]);
  
  // Notify to Telegram if severity of 0-4
  if (severity <= 4) {
    const body = `Received Syslog message of level ${severity} from ${rinfo.address}: ${messageStr}`;
    sendTelegramMessage(body);
  }
  
  // Log message to console
  console.log(`${rinfo.address} - ${messageStr}`);
  
  // Emit Socket.IO event after message processing
  io.emit('syslogActivity', messageStr);
});

syslogServer.on('listening', () => {
  const address = syslogServer.address();
  console.log(`Syslog server listening ${address.address}:${address.port}`);
});

syslogServer.bind(PORT, HOST);

// Handle client connections via Socket.IO
io.on('connection', (socket) => {
  console.log('Cliente conectado:', socket.id);

  // Handle client disconnection events
  socket.on('disconnect', () => {
    console.log('Cliente desconectado:', socket.id);
  });
});

// Listen for connections on the specified port
const port = 3000;
server.listen(port, () => {
  console.log(`Servidor Socket.IO escuchando en el puerto ${port}...`);
});
