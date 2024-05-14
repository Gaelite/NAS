import sys
import tempfile
import urllib.parse
import urllib.request
import json
import paramiko
import base64

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

def enviar_archivo_telegram(token, chat_id, configuracion, mensaje="Aquí está el archivo"):
    # Crear un archivo temporal para almacenar la configuración
    with tempfile.NamedTemporaryFile(mode='w', delete=False) as temp_file:
        temp_file.write(configuracion)
        archivo_temporal = temp_file.name

    url = f"https://api.telegram.org/bot{token}/sendDocument"
    datos = {'chat_id': chat_id, 'caption': mensaje}
    
    # Construir la solicitud multipart/form-data
    boundary = '-----BoundaryOfPythonFormPart'
    headers = {'Content-Type': 'multipart/form-data; boundary={0}'.format(boundary)}
    data = []
    data.append('--' + boundary)
    data.append('Content-Disposition: form-data; name="chat_id"')
    data.append('')
    data.append(str(chat_id))
    data.append('--' + boundary)
    data.append('Content-Disposition: form-data; name="caption"')
    data.append('')
    data.append(mensaje)
    data.append('--' + boundary)
    data.append('Content-Disposition: form-data; name="document"; filename="{0}"'.format(archivo_temporal))
    data.append('Content-Type: application/octet-stream')
    data.append('')
    with open(archivo_temporal, 'rb') as file:
        archivo_base64 = base64.b64encode(file.read()).decode()
        data.append(archivo_base64)
    
    
    
    data.append('--' + boundary + '--')
    body = '\r\n'.join(data)
    body = body.encode('utf-8')

    

    # Realizar la solicitud POST
    req = urllib.request.Request(url, body, headers)
    with urllib.request.urlopen(req) as response:
        resultado = response.read().decode('utf-8')

    # Verificar si la respuesta fue exitosa
    respuesta_json = json.loads(resultado)
    if respuesta_json['ok']:
        print("Archivo enviado exitosamente a Telegram.")
    else:
        print("Error al enviar el archivo a Telegram:", respuesta_json['description'])

if __name__ == "__main__":
    token = '7096921255:AAGnovM7Uzm4OYmktZp2F6ib-cLEidm4IQU'
    chat_id = '-1002006912983'  # Puedes obtener este valor hablando con el bot @userinfobot
    host = sys.argv[1]
    usuario = sys.argv[2]
    contraseña = sys.argv[3]

    configuracion = obtener_configuracion_ssh(host, usuario, contraseña)
    guardar_configuracion_en_archivo(configuracion, host)
    enviar_archivo_telegram(token, chat_id, configuracion, f"Configuración del  {host}")
