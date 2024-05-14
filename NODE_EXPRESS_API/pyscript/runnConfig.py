import paramiko
import schedule
import time
import os

def obtener_configuracion_ssh(host, usuario, contraseña, secret, comando):
    cliente_ssh = paramiko.SSHClient()
    cliente_ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())

    try:
        cliente_ssh.connect(hostname=host, username=usuario, password=contraseña, pkey=secret)
        _, stdout, _ = cliente_ssh.exec_command(comando)
        salida = stdout.read().decode()
        return salida
    finally:
        cliente_ssh.close()

def guardar_configuracion(host, usuario, contraseña, secret, comando):
    configuracion = obtener_configuracion_ssh(host, usuario, contraseña, secret, comando)

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

# Programar la tarea para ejecutarse cada 3 minutos
schedule.every(3).minutes.do(guardar_configuracion, host='192.168.1.1', usuario='gmedina', contraseña='cisco', secret='ruta_al_archivo_rsa', comando='show running-config')

# Bucle para ejecutar las tareas programadas
while True:
    schedule.run_pending()
    time.sleep(1)
