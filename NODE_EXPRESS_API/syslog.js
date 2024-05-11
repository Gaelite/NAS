import dgram from 'dgram'
import { Telegraf } from 'telegraf';

const HOST = '192.168.1.19';
const PORT = 514;

// Token de tu bot de Telegram
const botToken = '7096921255:AAGnovM7Uzm4OYmktZp2F6ib-cLEidm4IQU';
// ID del canal o grupo de Telegram
const chatId = '-1002006912983';

// Crear una instancia del bot de Telegram
const bot = new Telegraf(botToken);

// Configurar el servidor UDP para manejar mensajes syslog
const server = dgram.createSocket('udp4');

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

server.on('error', (err) => {
    console.log(`Server error:\n${err.stack}`);
    server.close();
});

server.on('message', async (data, rinfo) => {
    const parsedData = parseSyslogMessage(data);
    console.log(parsedData);
    // Enviar notificación al chat de Telegram
    await sendToTelegram(chatId, parsedData);
});

server.on('listening', () => {
    const address = server.address();
    console.log(`Server listening ${address.address}:${address.port}`);
});

// Enlazar el servidor UDP al puerto 514
server.bind(PORT, HOST);

// Función para enviar los datos al canal o grupo de Telegram con formato
async function sendToTelegram(chatId, data) {
    try {
        console.log('Intentando enviar mensaje a Telegram...');
        // Obtener la fecha y hora actual
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().slice(0, 10);
        const formattedTime = currentDate.toTimeString().slice(0, 8);

        // Construir el mensaje con formato
        const message = `Fecha: ${formattedDate}\nHora: ${formattedTime}\nDatos recibidos:\n${JSON.stringify(data)}`;

        console.log('Mensaje a enviar:', message);

        // Envía el mensaje al canal o grupo de Telegram
        await bot.telegram.sendMessage(chatId, message);

        console.log('Mensaje enviado con éxito a Telegram.');
    } catch (error) {
        console.error('Error al enviar mensaje a Telegram:', error.message);
    }
}

// Iniciar el bot de Telegram
bot.launch().then(() => console.log('Bot de Telegram iniciado correctamente.'));
