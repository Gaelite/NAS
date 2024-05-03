const net = require('net');
const { Telegraf } = require('telegraf');

// Configuración de conexión TCP
const host = '127.0.0.1';  // Dirección IP del servidor
const port = 5000;         // Puerto del servidor

// Token de tu bot de Telegram
const botToken = '7096921255:AAGnovM7Uzm4OYmktZp2F6ib-cLEidm4IQU';

// ID del canal o grupo de Telegram
const channelId = '-1002006912983'; // Reemplaza con el ID de tu canal o grupo

// Crear una instancia del bot de Telegram
const bot = new Telegraf(botToken);

// Crear servidor TCP
const server = net.createServer((socket) => {
    console.log('Cliente conectado desde: ' + socket.remoteAddress + ':' + socket.remotePort);

    // Manejar datos recibidos del cliente
    socket.on('data', (data) => {
        try {
            const receivedData = JSON.parse(data.toString()); // Convertir datos recibidos a objeto JavaScript
            console.log('Datos recibidos del cliente:', receivedData);

            // Enviar los datos al canal o grupo de Telegram con formato
            sendToTelegram(channelId, receivedData);
            
            // Hacer algo con los datos recibidos (por ejemplo, guardarlos en una base de datos)
            // Aquí debes implementar tu lógica para procesar los datos recibidos
            console.log('Datos recibidos correctamente.');
        } catch (error) {
            console.error('Error al procesar datos recibidos:', error.message);
        }
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

// Manejar el comando /start
bot.start(async (ctx) => {
    try {
        // Enviar mensaje de bienvenida al canal o grupo
        await bot.telegram.sendMessage(channelId, '¡Bienvenido a NAS! Aquí se mandarán las notificaciones syslog.');
        console.log('Mensaje de bienvenida enviado con éxito al canal o grupo.');
    } catch (error) {
        console.error('Error al enviar mensaje de bienvenida:', error.message);
    }
});

// Manejar errores de servidor
server.on('error', (error) => {
    console.error('Error en el servidor:', error.message);
});

// Escuchar conexiones en el puerto especificado
server.listen(port, host, () => {
    console.log(`Servidor TCP escuchando en ${host}:${port}`);
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

// Inicia el bot de Telegram
bot.launch();
