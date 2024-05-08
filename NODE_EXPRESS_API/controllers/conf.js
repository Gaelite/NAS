export const getTopology =  (req, res) => {
    const firstDevice = req.body;

    const pythonScriptPath = 'DeviceFinder.py';
    const cdCommand = `cd ../pyscript && `;
    
    const pythonCommand = `python ${pythonScriptPath} ${firstDevice.ip} ${firstDevice.user} ${firstDevice.password} ${firstDevice.secret}`;

    const command = cdCommand + pythonCommand ;

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
    

    users.push({ ...user, id: uuidv4()});

    res.send(`User with the same ${user.firstName} added to the database!`);
};