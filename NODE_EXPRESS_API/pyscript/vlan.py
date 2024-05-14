import paramiko
import time
import sys

def configurar_vlan(ip, username, password, secret, vlan_id, vlan_name):
    try:
        # Conectarse al dispositivo
        ssh_client = paramiko.SSHClient()
        ssh_client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
        ssh_client.connect(ip, username=username, password=password, timeout=5)

        # Crear la VLAN
        ssh_shell = ssh_client.invoke_shell()
        ssh_shell.send("conf t\n")
        time.sleep(1)
        ssh_shell.send(f"vlan {vlan_id}\n")
        time.sleep(1)
        ssh_shell.send("name {0}\n".format(vlan_name))
        time.sleep(1)
        ssh_shell.send("end\n")
        time.sleep(1)

        # Verificar la configuración
        ssh_shell.send("show vlan brief\n")
        time.sleep(2)

        # Recibir y mostrar salida
        output = ssh_shell.recv(65535).decode("utf-8")
        print(f"Configuración de VLAN en {ip}:\n{output}")

        # Cerrar la conexión SSH
        ssh_client.close()

        return True
    except Exception as e:
        print(f"Error al configurar VLAN en {ip}: {str(e)}")
        return False



ip = sys.argv[1]
username = sys.argv[2]
password = sys.argv[3]
secret = sys.argv[4]
vlan_id = int(sys.argv[5])
vlan_name = sys.argv[6]

# Configurar VLAN en el dispositivo dado
if configurar_vlan(ip, username, password, secret, vlan_id, vlan_name):
    print("VLAN configurada exitosamente.")
    print("Mostrando VLANs configuradas:")
    # Realizar conexión nuevamente para mostrar VLANs configuradas
    try:
        ssh_client = paramiko.SSHClient()
        ssh_client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
        ssh_client.connect(ip, username=username, password=password, timeout=5)

        ssh_shell = ssh_client.invoke_shell()
        ssh_shell.send("show vlan brief\n")
        time.sleep(2)

        output = ssh_shell.recv(65535).decode("utf-8")
        print(output)

        ssh_client.close()
    except Exception as e:
        print(f"Error al mostrar VLANs en {ip}: {str(e)}")
else:
    print("Hubo un error al configurar la VLAN.")
