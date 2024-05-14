import paramiko

def obtener_configuracion_ssh(host, usuario, contraseña, comando):
    # Crear una instancia de cliente SSH
    cliente_ssh = paramiko.SSHClient()

    # Ajustar la política de hostkey para aceptar automáticamente las claves SSH desconocidas
    cliente_ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())

    try:
        # Conectar al host SSH
        cliente_ssh.connect(hostname=host, username=usuario, password=contraseña)

        # Ejecutar el comando show running-config
        _, stdout, _ = cliente_ssh.exec_command(comando)

        # Leer la salida del comando
        salida = stdout.read().decode()

        return salida

    finally:
        # Cerrar la conexión SSH
        cliente_ssh.close()

# Datos de conexión SSH
host = 'tu_direccion_ip_del_router'
usuario = 'tu_usuario'
contraseña = 'tu_contraseña'
comando = 'show running-config'

# Llamar a la función para obtener la configuración
configuracion = obtener_configuracion_ssh(host, usuario, contraseña, comando)

# Guardar la configuración en un archivo de texto
with open('configuracion_router.txt', 'w') as archivo:
    archivo.write(configuracion)

print("Configuración guardada exitosamente en 'configuracion_router.txt'")
