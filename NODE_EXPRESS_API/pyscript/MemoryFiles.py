from netmiko import ConnectHandler
import sys

ssh_connection = ConnectHandler(
    device_type='cisco_ios',
    ip=sys.argv[1],
    username=sys.argv[2],
    password=sys.argv[3],
    secret=sys.argv[4]
    )

ssh_connection.enable()#Activa modo EXEC privilegiado

memoryInfo = ssh_connection.send_command("show memory statistics", delay_factor=2)
spaceInfo = ssh_connection.send_command("show file systems", delay_factor=2)

filesystem_lines = spaceInfo.strip().split('\n')

# Buscar la línea que contiene el tamaño total y el espacio libre
for line in filesystem_lines:
    if '*' in line:  # La línea con * indica el sistema de archivos principal
        size, free = line.split()[1:3]
        break

# Convertir tamaño total y espacio libre a enteros
total_size = int(size)
free_space = int(free)

# Calcular el porcentaje de almacenamiento utilizado
used_percent = ((total_size - free_space) / total_size) * 100

print(f"Memory information:\n {memoryInfo}\nStorage percentage used: {used_percent:.2f}%")
ssh_connection.disconnect()
