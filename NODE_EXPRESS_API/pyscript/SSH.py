import paramiko
import json
from netmiko import ConnectHandler
import sys

def ssh_login(host, username, password, syslog_ip, secret):
    try:
        device = {
            'device_type': 'cisco_ios',
            'host': host,
            'username': username,
            'password': password,
            'secret': secret
        }

        ssh_connection = ConnectHandler(**device)
            

        #print(host)
        #print(syslog_ip)

        result = {'status': 'success', 'message': 'SSH connection successful to ' + host, 'syslog_ip': syslog_ip}
        print(json.dumps(result))

    except Exception as e:
        #print('Error connecting via SSH:', str(e))
        result = {'status': 'error', 'message': 'Error al conectarse a SSH'}
        print(json.dumps(result))

if __name__ == "__main__":
    host = sys.argv[1]  # Obtener la dirección IP desde los argumentos de línea de comandos
    username = 'gmedina'  # Reemplazar con firstDevice.user
    password = 'cisco'  # Reemplazar con firstDevice.password
    syslog_ip = '192.168.1.19'  # Reemplazar con firstDevice.syslogIP
    secret = 'cisco'  # Reemplazar con firstDevice.secret
    result = ssh_login(host, username, password, syslog_ip, secret)
 # Imprimir la respuesta directamente, sin necesidad de convertirla a JSON

