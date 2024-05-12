import { exec } from 'child_process';
import { readFileSync } from 'fs';
const cdCommand = `cd ./pyscript && `;


export const test4 = (req, res) => {
    const firstDevice = req.body;
    const pythonScriptPath = 'test.py';
    
    const pythonCommand = `py ${pythonScriptPath} ${firstDevice.ip} `;

    const command = cdCommand + pythonCommand ;

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error al ejecutar el script de Python: ${error}`);
            res.status(500).send('Error interno del servidor');
            return;
        }
        res.send(stdout);
    });
};

export const verifySSH = async (req, res) => {
    const { ip, user, password, syslogIP, secret } = req.body;
  
    // Validate IP address format
    if (typeof ip !== 'string' || ip.trim() === '') {
      return res.status(400).json({ status: 'error', message: 'Formato de dirección IP incorrecto' });
    }
  
    const ipBlocks = ip.split('.');
    if (ipBlocks.length !== 4 || ipBlocks.some(block => isNaN(parseInt(block, 10)) || parseInt(block, 10) < 0 || parseInt(block, 10) > 255)) {
      return res.status(400).json({ status: 'error', message: 'Formato de dirección IP incorrecto' });
    }

    const SSHConfig = {
        host: '',
        username: '',
        password: '',
        privateKey: readFileSync('/home/itsvaalentine/.ssh/id_rsa.pub')
    };
  
    // Create a configuration object without optional secret field
    const config = {
      host: ip,
      username: user,
      password,
    };
    if (secret) {
      config.privateKey = secret; // Assuming the secret is a private key string
    }
    
    let client;
    try {
      // Establish SSH connection using the configuration
      const client = new Client();
      await client.connect(config);
  
      console.log('Conexión SSH exitosa');
      console.log('Servidor syslog IP:', syslogIP);
  
      return res.status(200).json({ status: 'success', ipBlocks: ipBlocks });
  
    } catch (error) {
      console.error('Error al conectarse a SSH:', error);
      return res.status(500).json({ status: 'error', message: 'Error al conectarse a SSH' });
    } finally {
      if (client) {
        await client.end();
      }
    }
  };



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