const sqlite3 = require('sqlite3').verbose();

// Ruta del archivo de base de datos
const dbPath = './network.db';

// Abrir la conexión con la base de datos
let db = new sqlite3.Database(dbPath, sqlite3.OPEN_READONLY, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Conectado a la base de datos network.db');
});

// Consulta de ejemplo para obtener todos los dispositivos
db.all('SELECT * FROM Devices', [], (err, rows) => {
  if (err) {
    console.error(err.message);
  }
  // Mostrar los dispositivos por consola
  console.log('Dispositivos:');
  rows.forEach((row) => {
    console.log(`ID: ${row.id}, Tipo de dispositivo: ${row.deviceType}, IP: ${row.ip}`);
  });
});

// Cerrar la conexión con la base de datos
db.close((err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Conexión con la base de datos cerrada');
});
