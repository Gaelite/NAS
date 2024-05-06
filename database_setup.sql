-- Crear tabla para dispositivos
CREATE TABLE IF NOT EXISTS Devices (
    id INTEGER PRIMARY KEY,
    deviceType TEXT,
    ip TEXT
);

-- Crear tabla para interfaces
CREATE TABLE IF NOT EXISTS Interfaces (
    id INTEGER PRIMARY KEY,
    deviceId INTEGER,
    interface TEXT,
    ipv4 TEXT,
    ipv6 TEXT,
    linkLocal TEXT,
    FOREIGN KEY (deviceId) REFERENCES Devices(id)
);

-- Crear tabla para conexiones
CREATE TABLE IF NOT EXISTS Connections (
    id INTEGER PRIMARY KEY,
    deviceId INTEGER,
    connectedFromInterface TEXT,
    fromIp TEXT,
    connectedToDevice TEXT,
    connectedToInterface TEXT,
    toIp TEXT,
    FOREIGN KEY (deviceId) REFERENCES Devices(id)
);

CREATE TABLE IF NOT EXISTS SyslogNotifications (
    id INTEGER PRIMARY KEY,
    deviceId INTEGER,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    message TEXT,
    FOREIGN KEY (deviceId) REFERENCES Devices(id)
);