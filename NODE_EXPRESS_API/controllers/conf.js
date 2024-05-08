export const getTopology =  (req, res) => {
    const pythonScriptPath = 'DeviceFinder.py'; // Ruta al archivo Python
    const folderPath = '../pyscript'; // Ruta a la carpeta que deseas ingresar
    // Comando para navegar a la carpeta deseada
    const cdCommand = `cd ${folderPath} && `;
    // Comando para ejecutar el script de Python
    const pythonCommand = `python ${pythonScriptPath}`;
    // Combinar los comandos para ejecutarlos en una sola llamada
    const command = cdCommand + pythonCommand;
    // Ejecutar el script de Python
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error al ejecutar el script de Python: ${error}`);
            res.status(500).send('Error interno del servidor');
            return;
        }
        res.json(JSON.parse(stdout));
        
    });
};

export const test = (req,res) => {
    res.send("JALAAAA")
}
