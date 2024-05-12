import paramiko
import json
from netmiko import ConnectHandler
import sys

def ssh_login(host, username, password, syslog_ip, secret):
  # Validate IP address format (assuming host is the IP address)
  if not isinstance(host, str) or not host.strip():
    return json.dumps({'status': 'error', 'message': 'Formato de dirección IP incorrecto'}), 400

  ip_blocks = host.split('.')
  if len(ip_blocks) != 4 or any(not block.isdigit() or not 0 <= int(block) <= 255 for block in ip_blocks):
    return json.dumps({'status': 'error', 'message': 'Formato de dirección IP incorrecto'}), 400

  # Validate syslog IP address format
  if not isinstance(syslog_ip, str) or not syslog_ip.strip():
    return json.dumps({'status': 'error', 'message': 'Formato de dirección IP de syslog incorrecto'}), 400

  syslog_ip_blocks = syslog_ip.split('.')
  if len(syslog_ip_blocks) != 4 or any(not block.isdigit() or not 0 <= int(block) <= 255 for block in syslog_ip_blocks):
    return json.dumps({'status': 'error', 'message': 'Formato de dirección IP de syslog incorrecto'}), 400

  try:
    device = {
      'device_type': 'cisco_ios',
      'host': host,
      'username': username,
      'password': password,
      'secret': secret
    }

    ssh_connection = ConnectHandler(**device)

    # Print informational messages outside the try block
    print('SSH connection successful to', host)
    print('Syslog IP:', syslog_ip)

    result = {'status': 'success', 'message': 'SSH connection successful to ' + host, 'syslog_ip': syslog_ip}
    return json.dumps(result)

  except Exception as e:
    print('Error connecting via SSH:', str(e))
    result = {'status': 'error', 'message': 'Error al conectarse a SSH'}
    return json.dumps(result)

if __name__ == "__main__":
    host = sys.argv[1]  # Obtener la dirección IP desde los argumentos de línea de comandos
    username = 'gmedina'  # Reemplazar con firstDevice.user
    password = 'cisco'  # Reemplazar con firstDevice.password
    syslog_ip = '192.168.1.19'  # Reemplazar con firstDevice.syslogIP
    secret = 'cisco'  # Reemplazar con firstDevice.secret
    result = ssh_login(host, username, password, syslog_ip, secret)
    print(json.dumps(result))  # Imprimir la respu