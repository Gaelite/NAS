const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

// Ruta del archivo de base de datos
const dbPath = './network.db';

// Crear la base de datos y las tablas si no existen
function createDatabase() {
    return new Promise((resolve, reject) => {
        // Leer el archivo SQL
        const sql = fs.readFileSync('./database_setup.sql').toString();

        // Abrir la conexión con la base de datos
        const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
            if (err) {
                reject(err.message);
            }
            console.log('Conectado a la base de datos network.db');
        });

        // Ejecutar los comandos SQL para crear las tablas
        db.exec(sql, (err) => {
            if (err) {
                reject(err.message);
            }
            console.log('Tablas creadas correctamente');
            // Cerrar la conexión con la base de datos
            db.close((err) => {
                if (err) {
                    reject(err.message);
                }
                console.log('Conexión con la base de datos cerrada');
                resolve();
            });
        });
    });
}

// Función para insertar datos en la base de datos
function insertData(data) {
    return new Promise((resolve, reject) => {
        // Abrir la conexión con la base de datos
        const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
            if (err) {
                reject(err.message);
            }
            console.log('Conectado a la base de datos network.db');

            // Iniciar una transacción
            db.run('BEGIN TRANSACTION');

            // Insertar los datos en las tablas
            data.devices.forEach(device => {
                db.run('INSERT INTO Devices (deviceType, ip) VALUES (?, ?)', [device.deviceType, device.ip], (err) => {
                    if (err) {
                        reject(err.message);
                    }
                });

                device.interfaces.forEach(interface => {
                    db.run('INSERT INTO Interfaces (deviceId, interface, ipv4, ipv6, linkLocal) VALUES (?, ?, ?, ?, ?)', [device.id, interface.interface, interface.ipv4, interface.ipv6, interface.linkLocal], (err) => {
                        if (err) {
                            reject(err.message);
                        }
                    });
                });

                device.connections.forEach(connection => {
                    db.run('INSERT INTO Connections (deviceId, connectedFromInterface, fromIp, connectedToDevice, connectedToInterface, toIp) VALUES (?, ?, ?, ?, ?, ?)', [device.id, connection.connectedFromInterface, connection.fromIp, connection.connectedToDevice, connection.connectedToInterface, connection.toIp], (err) => {
                        if (err) {
                            reject(err.message);
                        }
                    });
                });
            });

            // Finalizar la transacción
            db.run('COMMIT', (err) => {
                if (err) {
                    reject(err.message);
                }
                console.log('Datos insertados correctamente');
                // Cerrar la conexión con la base de datos
                db.close((err) => {
                    if (err) {
                        reject(err.message);
                    }
                    console.log('Conexión con la base de datos cerrada');
                    resolve();
                });
            });
        });
    });
}

// Ejemplo de datos a insertar en la base de datos (formato similar al que generas en Python)


// Crear la base de datos y luego insertar los datos
createDatabase()
    .catch((error) => console.error('Error:', error));
