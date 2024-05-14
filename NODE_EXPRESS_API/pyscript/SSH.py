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

        result = {'status': 'success', 'message': 'SSH connection successful to ' + host, 'syslog_ip': syslog_ip}
        print(json.dumps(result))

    except Exception as e:
        result = {'status': 'error', 'message': 'Error al conectarse a SSH: ' + str(e)}
        print(json.dumps(result))

# Obtener argumentos de línea de comandos
if __name__ == "__main__":
    if len(sys.argv) != 6:
        print("Uso: python script.py host username password syslog_ip secret")
        sys.exit(1)
    
    host = sys.argv[1]
    username = sys.argv[2]
    password = sys.argv[3]
    syslog_ip = sys.argv[4]
    secret = sys.argv[5]
    
    ssh_login(host, username, password, syslog_ip, secret)
