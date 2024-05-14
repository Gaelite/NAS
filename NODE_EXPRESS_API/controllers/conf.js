import { exec } from 'child_process';
import { readFileSync } from 'fs';

const cdCommand = `cd ./pyscript && `;

let First_Device = "192..168.1.1";
let ValidatedUser = "gmedina";
let ValidatedPassword = "cisco";
let ValidatedSecret = "cisco";
let SyslogServer = "";

export const test4 = (req, res) => {
        res.send(ValidatedPassword,ValidatedUser,ValidatedSecret,SyslogServer);
};


export const solicitarMemoria = (req,res) => {
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

export const solicitarCPU = (req,res) => {
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


export const getData = (req, res) => {
    const dataToSend = {
        user: user,
        password: password,
        secret: secret,
        First_Device: First_Device,
        ValidatedUser: ValidatedUser,
        ValidatedPassword: ValidatedPassword,
        ValidatedSecret: ValidatedSecret,
        SyslogServer: SyslogServer
    };

    res.send(dataToSend);
};

export const verifySSH = (req, res) => {
    const { ip, user, password, syslogIP, secret, port } = req.body;

    const pythonScriptPath = '/Users/valen/OneDrive/Documents/REDESS/NAS/NODE_EXPRESS_API/pyscript/SSH.py';

    const command = `python ${pythonScriptPath} "${ip}" "${user}" "${password}" "${syslogIP}" "${secret || ''}" "${port || '22'}"`;

    console.log(ip, user, password, secret )

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error al ejecutar el script de Python: ${error}`);
            res.status(500).send('Error interno del servidor');
            return;
        }
        if (stdout.startsWith('Error')) {
            console.error(`Error devuelto por el script de Python: ${stdout}`);
            res.status(500).send('Error interno del servidor');
            return;
        }
        let jsonResponse;
        try {
            jsonResponse = JSON.parse(stdout);
        } catch (parseError) {
            console.error(`Error al analizar la salida JSON del script de Python: ${parseError}`);
            res.status(500).send('Error interno del servidor');
            return;
        }
        ValidatedUser = user;
        ValidatedPassword = password;
        ValidatedSecret = secret; 
        SyslogServer = syslogIP;
        First_Device = ip;
        res.json(jsonResponse);
    });
};




export const getTopology =  (req, res) => {
    const firstDevice = req.body;
    const pythonScriptPath = 'DeviceFinder.py';
    
    const pythonCommand = `python ${pythonScriptPath} ${First_Device} ${ValidatedUser} ${ValidatedPassword} ${ValidatedSecret} ${SyslogServer}`;

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
    const Device = req.body;

    const pythonScriptPath = 'conf.py';
    
    const pythonCommand = `python ${pythonScriptPath} hostname ${Device.ip} ${ValidatedUser} ${ValidatedPassword} ${ValidatedSecret} ${Device.hostname}`;

    const command = cdCommand + pythonCommand ;

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error al ejecutar el script de Python: ${error}`);
            res.status(500).send('Error interno del servidor');
            return;
        }
        res.send("Hola");
        
    });
}

export const int_ip = (req,res) => {
    const Device = req.body;

    const pythonScriptPath = 'conf.py';
    
    const pythonCommand = `python ${pythonScriptPath} int_ip ${Device.ip} ${ValidatedUser} ${ValidatedPassword} ${ValidatedSecret} ${Device.int_ip} ${Device.mask} ${Device.int}`;

    const command = cdCommand + pythonCommand ;

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error al ejecutar el script de Python: ${error}`);
            res.status(500).send('Error interno del servidor');
            return;
        }
        res.send(stdout);
        
    });
}

export const int_desc = (req,res) => {
    const Device = req.body;

    const pythonScriptPath = 'conf.py';
    
    const pythonCommand = `python ${pythonScriptPath} change_int_desc ${Device.ip} ${ValidatedUser} ${ValidatedPassword} ${ValidatedSecret}  ${Device.int} ${Device.desc}`;
    console.log (Device.desc)
    const command = cdCommand + pythonCommand ;

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error al ejecutar el script de Python: ${error}`);
            res.status(500).send('Error interno del servidor');
            return;
        }
        res.send(stdout);
        
    });
}

export const motd = (req,res) => {
    const Device = req.body;

    const pythonScriptPath = 'conf.py';
    
    const pythonCommand = `python ${pythonScriptPath} motd ${Device.ip} ${ValidatedUser} ${ValidatedPassword} ${ValidatedSecret} ${Device.motd}`;

    const command = cdCommand + pythonCommand ;

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error al ejecutar el script de Python: ${error}`);
            res.status(500).send('Error interno del servidor');
            return;
        }
        res.send(stdout);
        
    });
}

export const intv6_ip = (req,res) => {
    const Device = req.body;

    const pythonScriptPath = 'conf.py';
    
    const pythonCommand = `python ${pythonScriptPath} intv6_ip ${Device.ip} ${ValidatedUser} ${ValidatedPassword} ${ValidatedSecret} ${Device.ipv6} ${Device.mask} ${Device.int}`;

    const command = cdCommand + pythonCommand ;

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error al ejecutar el script de Python: ${error}`);
            res.status(500).send('Error interno del servidor');
            return;
        }
        res.send(stdout);
        
    });
}

export const v6_unicast = (req,res) => {
    const Device = req.body;

    const pythonScriptPath = 'conf.py';
    
    const pythonCommand = `python ${pythonScriptPath} unicast ${Device.ip} ${ValidatedUser} ${ValidatedPassword} ${ValidatedSecret}`;

    const command = cdCommand + pythonCommand ;

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error al ejecutar el script de Python: ${error}`);
            res.status(500).send('Error interno del servidor');
            return;
        }
        res.send(stdout);
        
    });
}

export const ip_route = (req,res) => {
    const Device = req.body;

    const pythonScriptPath = 'conf.py';
    
    const pythonCommand = `python ${pythonScriptPath} rute ${Device.ip} ${ValidatedUser} ${ValidatedPassword} ${ValidatedSecret} ${Device.ip_route} ${Device.mask} ${Device.nextJump} ${Device.da}`;

    const command = cdCommand + pythonCommand ;

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error al ejecutar el script de Python: ${error}`);
            res.status(500).send('Error interno del servidor');
            return;
        }
        res.send(stdout);
        
    });
}

export const ipv6_route = (req,res) => {
    const Device = req.body;

    const pythonScriptPath = 'conf.py';
    
    const pythonCommand = `python ${pythonScriptPath} rutev6 ${Device.ip} ${ValidatedUser} ${ValidatedPassword} ${ValidatedSecret} ${Device.ipv6_route} ${Device.mask} ${Device.nextJump} ${Device.da}`;

    const command = cdCommand + pythonCommand ;

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error al ejecutar el script de Python: ${error}`);
            res.status(500).send('Error interno del servidor');
            return;
        }
        res.send(stdout);
        
    });
}

export const newUser = (req,res) => {
    const Device = req.body;

    const pythonScriptPath = 'conf.py';
    
    const pythonCommand = `python ${pythonScriptPath} user  ${Device.ip} ${ValidatedUser} ${ValidatedPassword} ${ValidatedSecret} ${Device.newUser} ${Device.priv} ${Device.secrePass}`;

    const command = cdCommand + pythonCommand ;

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error al ejecutar el script de Python: ${error}`);
            res.status(500).send('Error interno del servidor');
            return;
        }
        res.send(stdout);
        
    });
}

export const logginSyn = (req,res) => {
    const Device = req.body;

    const pythonScriptPath = 'conf.py';
    
    const pythonCommand = `python ${pythonScriptPath} logginsyn  ${Device.ip} ${ValidatedUser} ${ValidatedPassword} ${ValidatedSecret}`;

    const command = cdCommand + pythonCommand ;

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error al ejecutar el script de Python: ${error}`);
            res.status(500).send('Error interno del servidor');
            return;
        }
        res.send(stdout);
        
    });
}

export const syslog = (req,res) => {
    const Device = req.body;

    const pythonScriptPath = 'conf.py';
    
    const pythonCommand = `python ${pythonScriptPath} syslog  ${Device.ip} ${ValidatedUser} ${ValidatedPassword} ${ValidatedSecret} ${Device.serverIP}`;

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
    const Device = req.body;

    const pythonScriptPath = 'conf.py';
    
    const pythonCommand = `python ${pythonScriptPath} dhcp4  ${Device.ip} ${ValidatedUser} ${ValidatedPassword} ${ValidatedSecret} ${Device.dhcpPool} ${Device.interfaceIP} ${Device.mask} ${Device.dnsServer} ${Device.domainName}`;

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
    const Device = req.body;

    const pythonScriptPath = 'conf.py';
    
    const pythonCommand = `python ${pythonScriptPath} sshAu  ${Device.ip} ${ValidatedUser} ${ValidatedPassword} ${ValidatedSecret} ${Device.retries}`;

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
    const Device = req.body;

    const pythonScriptPath = 'conf.py';
    
    const pythonCommand = `python ${pythonScriptPath} sshTime  ${Device.ip} ${ValidatedUser} ${ValidatedPassword} ${ValidatedSecret} ${Device.timeOut}`;

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
    const Device = req.body;

    const pythonScriptPath = 'conf.py';
    
    const pythonCommand = `python ${pythonScriptPath} saveRunn  ${Device.ip} ${ValidatedUser} ${ValidatedPassword} ${ValidatedSecret}`;

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
    const Device = req.body;

    const pythonScriptPath = 'conf.py';
    
    const pythonCommand = `python ${pythonScriptPath} encryption  ${Device.ip} ${ValidatedUser} ${ValidatedPassword} ${ValidatedSecret}`;

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