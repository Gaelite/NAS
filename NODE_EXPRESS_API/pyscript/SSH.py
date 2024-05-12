import paramiko
import sys
import json

def verify_ssh(ip, user, password, syslog_ip, secret=None):
    # Validate IP address format
    if not isinstance(ip, str) or not ip.strip():
        return {'status': 'error', 'message': 'Formato de dirección IP incorrecto'}, 400
    
    ip_blocks = ip.split('.')
    if len(ip_blocks) != 4 or any(not block.isdigit() or not 0 <= int(block) <= 255 for block in ip_blocks):
        return {'status': 'error', 'message': 'Formato de dirección IP incorrecto'}, 400

    # Create SSH client object
    client = paramiko.SSHClient()
    client.set_missing_host_key_policy(paramiko.AutoAddPolicy())

    try:
        # Create a configuration object
        config = {'hostname': ip, 'username': user, 'password': password}
        if secret:
            config['pkey'] = paramiko.RSAKey.from_private_key(secret)
        
        # Connect to SSH
        client.connect(**config)
        print('Conexión SSH exitosa')
        print('Servidor syslog IP:', syslog_ip)
        return {'status': 'success', 'ipBlocks': ip_blocks}

    except Exception as e:
        print('Error al conectarse a SSH:', str(e))
        return {'status': 'error', 'message': 'Error al conectarse a SSH'}

    finally:
        client.close()