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

        result = {'status': 'success', 'message': 'SSH connection successful to ' + host}
        print(json.dumps(result))

    except Exception as e:
        #print('Error connecting via SSH:', str(e))
        result = {'status': 'error', 'message': 'Error al conectarse a SSH'}
        print(json.dumps(result))
