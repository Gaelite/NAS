const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const dgram = require('dgram');
const fs = require('fs');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Syslog server config
const HOST = '0.0.0.0';
const PORT = 514;
const LOG_FILE = 'syslog_messages.txt';

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

  fs.appendFile(LOG_FILE, `${rinfo.address} - ${messageStr}\n`, (err) => {
    if (err) throw err;
  });

  // Obtain severity level from the syslog messages
  const severity = parseInt(messageStr.split('-')[1].split(':')[0]);

  // Notify to Telegram if severity of 0-4
  if (severity <= 4) {
    const body = `Received Syslog message of level ${severity} from ${rinfo.address}: ${messageStr}`;
    sendTelegramMessage(body);
  }
});

syslogServer.on('listening', () => {
  const address = syslogServer.address();
  console.log(`Syslog server listening ${address.address}:${address.port}`);
});

syslogServer.bind(PORT, HOST);


// Manejar conexiones de clientes a través de Socket.IO
io.on('connection', (socket) => {
  console.log('Cliente conectado:', socket.id);

  // Manejar eventos de desconexión de clientes
  socket.on('disconnect', () => {
    console.log('Cliente desconectado:', socket.id);
  });
});


// Escuchar conexiones en el puerto especificado
const port = 3000;
server.listen(port, () => {
    console.log(`Servidor Socket.IO escuchando en el puerto ${port}...`);
    
    // Requerir y ejecutar tu archivo de Telegram syslog.js después de iniciar el servidor Socket.IO
    require('./syslog.js');
});
