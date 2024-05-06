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

// Manejar eventos de mensajes syslog desde el servidor socket.io
socket.on('syslogActivity', async (log) => {
    console.log('Actividad syslog recibida:', log);
    try {
        // Enviar el log al canal o grupo de Telegram
        await bot.telegram.sendMessage(channelId, log);
        console.log('Mensaje enviado al canal o grupo de Telegram.');
    } catch (error) {
        console.error('Error al enviar mensaje a Telegram:', error.message);
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

// Función para enviar los datos al canal o grupo de Telegram con formato
async function sendToTelegram(channelId, data) {
    try {
        // Obtener la fecha y hora actual
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().slice(0, 10);
        const formattedTime = currentDate.toTimeString().slice(0, 8);

        // Construir el mensaje con formato
        const message = `Fecha: ${formattedDate}\nHora: ${formattedTime}\nDatos recibidos:\n${JSON.stringify(data)}`;

        console.log('Intentando enviar mensaje a Telegram:', message);

        // Envía el mensaje al canal o grupo de Telegram
        await bot.telegram.sendMessage(channelId, message);

        console.log('Mensaje enviado con éxito a Telegram.');
    } catch (error) {
        console.error('Error al enviar mensaje a Telegram:', error.message);
    }
}

// Iniciar el bot de Telegram
bot.launch().then(() => console.log('Bot de Telegram iniciado correctamente.'));
