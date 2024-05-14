from netmiko import ConnectHandler
import sys
import json

try:
    # Conectarse al dispositivo Cisco
    ssh_connection = ConnectHandler(
        device_type='cisco_ios',
        ip=sys.argv[1],
        username=sys.argv[2],
        password=sys.argv[3],
        secret=sys.argv[4]
    )

    # Habilitar modo EXEC privilegiado
    ssh_connection.enable()

    # Obtener información de la CPU
    cpu_info = ssh_connection.send_command("show processes cpu sorted | exclude 0.00% | head", delay_factor=2)
    print(f"CPU information:\n{cpu_info}")

    # Desconectar la conexión SSH
    ssh_connection.disconnect()
except Exception as error:
    print(json.dumps("Intenta de nuevo"))


