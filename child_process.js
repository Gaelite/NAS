const { spawn } = require('child_process');

// Ruta al script Python
const pythonScriptPath = 'DeviceFinder.py';

// Argumentos que pasarás al script Python
const jsonPackage = {
    "devices": []
};
  
// Convertir la lista all_devices en el formato esperado
for (const x of all_devices) {
    const interfaces = x.interfaces.map(i => ({
        "Interface": i["Interface"],
        "IPv4": i["IPv4"],
        "IPv6": i["IPv6"],
        "Link-local": i["Link-local"]
    }));
    
    const connections = x.connections.map(c => ({
        "Connected_from_Interface": c["Connected_from_Interface"],
        "From_IP": c["From_IP"],
        "Device": c["Device"],
        "Connected_to_Interface": c["Connected_to_Interface"],
        "To_IP": c["To_IP"]
    }));

    jsonPackage.devices.push({
        "deviceType": x.deviceType,
        "ip": x.ip,
        "interfaces": interfaces,
        "connections": connections
    });
}
  
// Convertir jsonPackage a una cadena JSON
const jsonString = JSON.stringify(jsonPackage);
  
// Ahora puedes usar jsonString como argumento para tu script Python
const args = [jsonString];
  
// Crear una instancia del proceso Python
const pythonProcess = spawn('python', [pythonScriptPath, ...args]);

// Manejar la salida del proceso Python
pythonProcess.stdout.on('data', (data) => {
    console.log(`Salida del script Python: ${data}`);
});

// Manejar errores del proceso Python
pythonProcess.stderr.on('data', (data) => {
    console.error(`Error del script Python: ${data}`);
});

// Manejar la finalización del proceso Python
pythonProcess.on('close', (code) => {
    console.log(`El script Python ha finalizado con código de salida ${code}`);
});
