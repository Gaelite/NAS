const sqlite3 = require('sqlite3').verbose();
const { get_device_neighbor_details, get_device_info } = require('./DeviceFinder.py'); // Asegúrate de que las funciones estén en el archivo functions.js

// Ruta del archivo de base de datos
const dbPath = './network.db';

// Inicio del tiempo
const inicio = Date.now();

// Variables para el ingreso de datos
const ip = "192.168.10.1"; // Puedes modificar esto para que se ingrese como argumento o de alguna otra manera
const username = "gmedina";
const password = "cisco";
const secret = "cisco";

// Crear una instancia de la base de datos
let db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('Conectado a la base de datos network.db');
  }
});

// Insertar datos en la base de datos
function insertData(all_devices) {
  const insertDevice = 'INSERT INTO Devices (deviceType, ip) VALUES (?, ?)';
  const insertInterface = 'INSERT INTO Interfaces (deviceId, interface, ipv4, ipv6, linkLocal) VALUES (?, ?, ?, ?, ?)';
  const insertConnection = 'INSERT INTO Connections (deviceId, connectedFromInterface, fromIp, connectedToDevice, connectedToInterface, toIp) VALUES (?, ?, ?, ?, ?, ?)';
  
  // Iniciar una transacción
  db.serialize(() => {
    db.run('BEGIN TRANSACTION');
    
    all_devices.forEach((device) => {
      db.run(insertDevice, [device.deviceType, device.ip], function(err) {
        if (err) {
          console.error(err.message);
        }
        
        const deviceId = this.lastID; // Obtener el ID del dispositivo insertado
        
        device.interfaces.forEach((iface) => {
          db.run(insertInterface, [deviceId, iface.Interface, iface.IPv4, iface.IPv6, iface['Link-local']], function(err) {
            if (err) {
              console.error(err.message);
            }
          });
        });
        
        device.connections.forEach((connection) => {
          db.run(insertConnection, [deviceId, connection.Connected_from_Interface, connection.From_IP, connection.Device, connection.Connected_to_Interface, connection.To_IP], function(err) {
            if (err) {
              console.error(err.message);
            }
          });
        });
      });
    });
    
    // Finalizar la transacción
    db.run('COMMIT', (err) => {
      if (err) {
        console.error(err.message);
      } else {
        console.log('Datos insertados correctamente');
      }
      // Cerrar la conexión con la base de datos
      db.close((err) => {
        if (err) {
          console.error(err.message);
        } else {
          console.log('Conexión con la base de datos cerrada');
        }
      });
    });
  });
}

// Obtener datos de los dispositivos y sus vecinos
get_device_info(ip, username, password, secret).then((current_device) => {
  get_device_neighbor_details(ip, username, password, secret).then(([neighbor_device, type]) => {
    // Procesar los datos y luego insertarlos en la base de datos
    const all_devices = [];
    const device = new Device(ip);
    device.set_interfaces(current_device[0], current_device[1]);
    for (let x = 0; x < neighbor_device.length; x++) {
      if (neighbor_device[x][0] === current_device[0][0]) {
        break;
      }
      for (const z of device.interfaces) {
        if (z.Interface === neighbor_device[x][4]) {
          const local_IP = z.IPv4;
        }
      }
      device.set_connections(neighbor_device[x][4], local_IP, type[x][2], neighbor_device[x][5], neighbor_device[x][2]);
    }
    all_devices.push(device);
    
    // Insertar los datos en la base de datos
    insertData(all_devices);
  }).catch((error) => {
    console.error('Error:', error);
  });
}).catch((error) => {
  console.error('Error:', error);
});
