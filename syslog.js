const { Telegraf } = require('telegraf');
const io = require('socket.io-client');

// Token de tu bot de Telegram
const botToken = '7096921255:AAGnovM7Uzm4OYmktZp2F6ib-cLEidm4IQU';
// ID del canal o grupo de Telegram
const channelId = '-1002006912983';

// URL del servidor socket.io
const socketUrl = 'http://localhost:3000'; // Ajusta la URL según la configuración del servidor

// Crear una instancia del bot de Telegram
const bot = new Telegraf(botToken);

// Conectar al servidor socket.io
const socket = io(socketUrl);

// Manejar eventos de conexión al servidor socket.io
socket.on('connect', () => {
    console.log('Conectado al servidor socket.io!');
});

// Manejar eventos de desconexión del servidor socket.io
socket.on('disconnect', () => {
    console.log('Desconectado del servidor socket.io');
});

// Manejar eventos de mensajes desde el servidor socket.io
socket.on('message', (data) => {
    console.log('Mensaje recibido desde el servidor socket.io:', data);
});

// Manejar el comando /start
bot.start(async (ctx) => {
    try {
        // Enviar mensaje de bienvenida al canal o grupo
        await ctx.telegram.sendMessage(channelId, '¡Bienvenido a NAS! Aquí se mandarán las notificaciones syslog.');
        console.log('Mensaje de bienvenida enviado con éxito al canal o grupo.');
    } catch (error) {
        console.error('Error al enviar mensaje de bienvenida:', error.message);
    }
});

// Manejar errores de servidor
socket.on('error', (error) => {
    console.error('Error en el servidor:', error.message);
});

// Manejar conexiones a socket.io
socket.on('connect_error', (error) => {
    console.error('Error de conexión con el servidor socket.io:', error.message);
});

// Iniciar el bot de Telegram
bot.launch().then(() => console.log('Bot de Telegram iniciado correctamente.'));
