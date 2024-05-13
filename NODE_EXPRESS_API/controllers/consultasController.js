import sqlite3 from 'sqlite3';

const cdCommand = `cd ./pyscript && `;

export const realizarConsulta = (req, res) => {
    const query = req.query.q; 
    const db = new sqlite3.Database('network_data.db');

    db.all(query, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ data: rows });
    });

    db.close();
};

export const solicitarMemoria = () => {
    const Device = req.body;

    const pythonScriptPath = 'MemoryFiles.py';
    
    const pythonCommand = `python ${pythonScriptPath} ${Device.ip} ${ValidatedUser} ${ValidatedPassword} ${ValidatedSecret}`;

    const command = cdCommand + pythonCommand ;

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error al ejecutar el script de Python: ${error}`);
            res.status(500).send('Error interno del servidor');
            return;
        }
        res.json(stdout); 
    });
};

export const solicitarCPU = () => {
    const Device = req.body;

    const pythonScriptPath = 'CPUusage.py';
    
    const pythonCommand = `python ${pythonScriptPath} ${Device.ip} ${ValidatedUser} ${ValidatedPassword} ${ValidatedSecret}`;

    const command = cdCommand + pythonCommand ;

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error al ejecutar el script de Python: ${error}`);
            res.status(500).send('Error interno del servidor');
            return;
        }
        res.json(stdout); 
    });
};

