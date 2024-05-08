const cdCommand = `cd ../pyscript && `;

export const getTopology =  (req, res) => {
    const firstDevice = req.body;

    const pythonScriptPath = 'DeviceFinder.py';
    
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

export const hostname = (req,res) => {
    const firstDevice = req.body;

    const pythonScriptPath = 'conf.py';
    
    const pythonCommand = `python ${pythonScriptPath} hostname ${firstDevice.ip} ${firstDevice.user} ${firstDevice.password} ${firstDevice.secret} ${firstDevice.hostname}`;

    const command = cdCommand + pythonCommand ;

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error al ejecutar el script de Python: ${error}`);
            res.status(500).send('Error interno del servidor');
            return;
        }
        res.json(JSON.parse(stdout));
        
    });
}

export const int_ip = (req,res) => {
    const firstDevice = req.body;

    const pythonScriptPath = 'conf.py';
    
    const pythonCommand = `python ${pythonScriptPath} int_ip ${firstDevice.ip} ${firstDevice.user} ${firstDevice.password} ${firstDevice.secret} ${firstDevice.int_ip} ${firstDevice.mask} ${firstDevice.int}`;

    const command = cdCommand + pythonCommand ;

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error al ejecutar el script de Python: ${error}`);
            res.status(500).send('Error interno del servidor');
            return;
        }
        res.json(JSON.parse(stdout));
        
    });
}

export const int_desc = (req,res) => {
    const firstDevice = req.body;

    const pythonScriptPath = 'conf.py';
    
    const pythonCommand = `python ${pythonScriptPath} change_int_desc ${firstDevice.ip} ${firstDevice.user} ${firstDevice.password} ${firstDevice.secret}  ${firstDevice.int} ${firstDevice.desc}`;

    const command = cdCommand + pythonCommand ;

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error al ejecutar el script de Python: ${error}`);
            res.status(500).send('Error interno del servidor');
            return;
        }
        res.json(JSON.parse(stdout));
        
    });
}

export const motd = (req,res) => {
    const firstDevice = req.body;

    const pythonScriptPath = 'conf.py';
    
    const pythonCommand = `python ${pythonScriptPath} motd ${firstDevice.ip} ${firstDevice.user} ${firstDevice.password} ${firstDevice.secret} ${firstDevice.motd}`;

    const command = cdCommand + pythonCommand ;

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error al ejecutar el script de Python: ${error}`);
            res.status(500).send('Error interno del servidor');
            return;
        }
        res.json(JSON.parse(stdout));
        
    });
}

export const intv6_ip = (req,res) => {
    const firstDevice = req.body;

    const pythonScriptPath = 'conf.py';
    
    const pythonCommand = `python ${pythonScriptPath} intv6_ip ${firstDevice.ip} ${firstDevice.user} ${firstDevice.password} ${firstDevice.secret} ${firstDevice.ipv6} ${firstDevice.mask} ${firstDevice.int}`;

    const command = cdCommand + pythonCommand ;

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error al ejecutar el script de Python: ${error}`);
            res.status(500).send('Error interno del servidor');
            return;
        }
        res.json(JSON.parse(stdout));
        
    });
}

export const v6_unicast = (req,res) => {
    const firstDevice = req.body;

    const pythonScriptPath = 'conf.py';
    
    const pythonCommand = `python ${pythonScriptPath} unicast ${firstDevice.ip} ${firstDevice.user} ${firstDevice.password} ${firstDevice.secret}`;

    const command = cdCommand + pythonCommand ;

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error al ejecutar el script de Python: ${error}`);
            res.status(500).send('Error interno del servidor');
            return;
        }
        res.json(JSON.parse(stdout));
        
    });
}

export const ip_route = (req,res) => {
    const firstDevice = req.body;

    const pythonScriptPath = 'conf.py';
    
    const pythonCommand = `python ${pythonScriptPath} rute ${firstDevice.ip} ${firstDevice.user} ${firstDevice.password} ${firstDevice.secret} ${firstDevice.ip_route} ${firstDevice.mask} ${firstDevice.nextJump} ${firstDevice.da}`;

    const command = cdCommand + pythonCommand ;

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error al ejecutar el script de Python: ${error}`);
            res.status(500).send('Error interno del servidor');
            return;
        }
        res.json(JSON.parse(stdout));
        
    });
}

export const ipv6_route = (req,res) => {
    const firstDevice = req.body;

    const pythonScriptPath = 'conf.py';
    
    const pythonCommand = `python ${pythonScriptPath} rutev6 ${firstDevice.ip} ${firstDevice.user} ${firstDevice.password} ${firstDevice.secret} ${firstDevice.ipv6_route} ${firstDevice.mask} ${firstDevice.nextJump} ${firstDevice.da}`;

    const command = cdCommand + pythonCommand ;

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error al ejecutar el script de Python: ${error}`);
            res.status(500).send('Error interno del servidor');
            return;
        }
        res.json(JSON.parse(stdout));
        
    });
}

export const newUser = (req,res) => {
    const firstDevice = req.body;

    const pythonScriptPath = 'conf.py';
    
    const pythonCommand = `python ${pythonScriptPath} user  ${firstDevice.ip} ${firstDevice.user} ${firstDevice.password} ${firstDevice.secret} ${firstDevice.newUser} ${firstDevice.priv} ${firstDevice.secrePass}`;

    const command = cdCommand + pythonCommand ;

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error al ejecutar el script de Python: ${error}`);
            res.status(500).send('Error interno del servidor');
            return;
        }
        res.json(JSON.parse(stdout));
        
    });
}

export const logginSyn = (req,res) => {
    const firstDevice = req.body;

    const pythonScriptPath = 'conf.py';
    
    const pythonCommand = `python ${pythonScriptPath} logginsyn  ${firstDevice.ip} ${firstDevice.user} ${firstDevice.password} ${firstDevice.secret}`;

    const command = cdCommand + pythonCommand ;

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error al ejecutar el script de Python: ${error}`);
            res.status(500).send('Error interno del servidor');
            return;
        }
        res.json(JSON.parse(stdout));
        
    });
}

export const syslog = (req,res) => {
    const firstDevice = req.body;

    const pythonScriptPath = 'conf.py';
    
    const pythonCommand = `python ${pythonScriptPath} syslog  ${firstDevice.ip} ${firstDevice.user} ${firstDevice.password} ${firstDevice.secret} ${firstDevice.serverIP}`;

    const command = cdCommand + pythonCommand ;

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error al ejecutar el script de Python: ${error}`);
            res.status(500).send('Error interno del servidor');
            return;
        }
        res.json(JSON.parse(stdout));
        
    });
}

export const DHCPv4 = (req,res) => {
    const firstDevice = req.body;

    const pythonScriptPath = 'conf.py';
    
    const pythonCommand = `python ${pythonScriptPath} dhcp4  ${firstDevice.ip} ${firstDevice.user} ${firstDevice.password} ${firstDevice.secret} ${firstDevice.dhcpPool} ${firstDevice.interfaceIP} ${firstDevice.mask} ${firstDevice.dnsServer} ${firstDevice.domainName}`;

    const command = cdCommand + pythonCommand ;

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error al ejecutar el script de Python: ${error}`);
            res.status(500).send('Error interno del servidor');
            return;
        }
        res.json(JSON.parse(stdout));
        
    });
}

export const sshAuth = (req,res) => {
    const firstDevice = req.body;

    const pythonScriptPath = 'conf.py';
    
    const pythonCommand = `python ${pythonScriptPath} sshAu  ${firstDevice.ip} ${firstDevice.user} ${firstDevice.password} ${firstDevice.secret} ${firstDevice.retries}`;

    const command = cdCommand + pythonCommand ;

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error al ejecutar el script de Python: ${error}`);
            res.status(500).send('Error interno del servidor');
            return;
        }
        res.json(JSON.parse(stdout));
        
    });
}

export const sshTime = (req,res) => {
    const firstDevice = req.body;

    const pythonScriptPath = 'conf.py';
    
    const pythonCommand = `python ${pythonScriptPath} sshTime  ${firstDevice.ip} ${firstDevice.user} ${firstDevice.password} ${firstDevice.secret} ${firstDevice.timeOut}`;

    const command = cdCommand + pythonCommand ;

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error al ejecutar el script de Python: ${error}`);
            res.status(500).send('Error interno del servidor');
            return;
        }
        res.json(JSON.parse(stdout));
        
    });
}

export const saveRunn = (req,res) => {
    const firstDevice = req.body;

    const pythonScriptPath = 'conf.py';
    
    const pythonCommand = `python ${pythonScriptPath} saveRunn  ${firstDevice.ip} ${firstDevice.user} ${firstDevice.password} ${firstDevice.secret}`;

    const command = cdCommand + pythonCommand ;

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error al ejecutar el script de Python: ${error}`);
            res.status(500).send('Error interno del servidor');
            return;
        }
        res.json(JSON.parse(stdout));
        
    });
}

export const encryption = (req,res) => {
    const firstDevice = req.body;

    const pythonScriptPath = 'conf.py';
    
    const pythonCommand = `python ${pythonScriptPath} encryption  ${firstDevice.ip} ${firstDevice.user} ${firstDevice.password} ${firstDevice.secret}`;

    const command = cdCommand + pythonCommand ;

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error al ejecutar el script de Python: ${error}`);
            res.status(500).send('Error interno del servidor');
            return;
        }
        res.json(JSON.parse(stdout));
        
    });
}
export const test = (req,res) => {

    res.send(`User with the s added to the database!`);
};