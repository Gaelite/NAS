import paramiko
import schedule
import time
import os

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

def guardar_configuracion(host, usuario, contraseña, secret, comando):
    configuracion = obtener_configuracion_ssh(host, usuario, contraseña, comando)

    # Crear la carpeta si no existe
    carpeta_destino = 'configuraciones'
    if not os.path.exists(carpeta_destino):
        os.makedirs(carpeta_destino)

    # Generar el nombre del archivo con la fecha y hora actual
    nombre_archivo = time.strftime("config_%Y%m%d_%H%M%S.txt")

    # Guardar la configuración en el archivo dentro de la carpeta
    ruta_archivo = os.path.join(carpeta_destino, nombre_archivo)
    with open(ruta_archivo, 'w') as archivo:
        archivo.write(configuracion)

    print(f"Configuración guardada exitosamente en '{ruta_archivo}'")

# Parametros para la conexión SSH y comando
host = '192.168.1.1'
usuario = 'gmedina'
contraseña = 'cisco'
secret = 'cisco'
comando = 'show running-config'

# Programar la tarea para ejecutarse cada 3 minutos
schedule.every(3).minutes.do(guardar_configuracion, host=host, usuario=usuario, contraseña=contraseña, secret=secret, comando=comando)

# Bucle para ejecutar las tareas programadas
while True:
    schedule.run_pending()
    time.sleep(1)
