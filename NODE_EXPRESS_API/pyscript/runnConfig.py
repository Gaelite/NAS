import paramiko

def obtener_configuracion_ssh(host, usuario, contraseña, comando):
    cliente_ssh = paramiko.SSHClient()

    cliente_ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())

    try:
        cliente_ssh.connect(hostname=host, username=usuario, password=contraseña)

        _, stdout, _ = cliente_ssh.exec_command(comando)

        salida = stdout.read().decode()

        return salida

    finally:
        cliente_ssh.close()

host = '192.168.1.1'
usuario = 'gmedina'
contraseña = 'cisco'
comando = 'show running-config'

configuracion = obtener_configuracion_ssh(host, usuario, contraseña, comando)

with open('configuracion_router.txt', 'w') as archivo:
    archivo.write(configuracion)

print("Configuración guardada exitosamente en 'configuracion_router.txt'")
