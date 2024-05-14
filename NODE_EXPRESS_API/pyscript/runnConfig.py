import sys
import paramiko

def obtener_configuracion_ssh(host, usuario, contraseña):
    comando = 'show running-config'  # Comando fijo

    cliente_ssh = paramiko.SSHClient()
    cliente_ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())

    try:
        cliente_ssh.connect(hostname=host, username=usuario, password=contraseña)
        _, stdout, _ = cliente_ssh.exec_command(comando)
        salida = stdout.read().decode()
        return salida
    finally:
        cliente_ssh.close()

def guardar_configuracion_en_archivo(configuracion, host):
    with open(f'configuracion_{host}.txt', 'w') as archivo:
        archivo.write(configuracion)
    print(f"Configuración guardada exitosamente en 'configuracion_{host}.txt'")

if __name__ == "__main__":
   
    host = sys.argv[1]
    usuario = sys.argv[2]
    contraseña = sys.argv[3]

    configuracion = obtener_configuracion_ssh(host, usuario, contraseña)
    guardar_configuracion_en_archivo(configuracion, host)
