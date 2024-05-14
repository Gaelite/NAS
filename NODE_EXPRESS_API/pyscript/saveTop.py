from Devices import Device
import time
import sys
import concurrent.futures
from functions import get_device_neighbor_details, get_device_info,NAT,getSerial
import json
import sqlite3
from runnConfig import obtener_configuracion_ssh, enviar_archivo_telegram,guardar_configuracion_en_archivo

if __name__ == "__main__":
    token = '7096921255:AAGnovM7Uzm4OYmktZp2F6ib-cLEidm4IQU'
    chat_id = '-1002006912983'  # Puedes obtener este valor hablando con el bot @userinfobot
    hostnamesNei = []
    hostNum = 0
    all_devices = []
    used_IPs = ['148.239.61.210']
    unused_IPs = []
    neighbor_device = []
    deviceNum = 0
    counter = 0 
    ind = 0

    json_Pack = []

    ip = sys.argv[1]#input("Hola ip")
    username = sys.argv[2] #input("Hola username")
    password = sys.argv[3] #input("Hola password")
    secret = sys.argv[4] #input("Hola secret")
    SyslogServer = sys.argv[5]

    while True:
        try:
            print(ip)
            with concurrent.futures.ThreadPoolExecutor(max_workers=2) as executor:
                # Lanzamos las tareas
                devicet = executor.submit(get_device_info,ip,username,password,secret)
                neighbor =executor.submit(get_device_neighbor_details,ip,username,password,secret,SyslogServer)
                # Obtenemos los resultados
                current_device = devicet.result()#aqui no jala
                neighbor_device,type = neighbor.result()#aqui no jala
                
                for x in range(len(neighbor_device)):
                    all_devices[deviceNum].interfaces
                    if neighbor_device[x][0] == current_device[0][0]:
                        break
                    for z in all_devices[deviceNum].interfaces:
                        if z["Interface"] == neighbor_device[x][5] or z["Interface"] == "Vlan1":
                            local_Ip = z["IPv4"]
                            all_devices[deviceNum].set_connections(all_devices[deviceNum].hostname,neighbor_device[x][4],local_Ip,hostnamesNei[hostNum], type[x][2], neighbor_device[x][5], neighbor_device[x][2],all_devices[deviceNum].modelo,getSerial(neighbor_device[x][2],username,password,secret))
                            if len(hostnamesNei)-1 > hostNum:
                                hostNum += 1

                hostnamesNei = []
                hostNum = 0

                configuracion = obtener_configuracion_ssh(ip, username, password)
                guardar_configuracion_en_archivo(configuracion, ip)
                enviar_archivo_telegram(token, chat_id, configuracion, f"Configuración del Dispositivo {ip}")

                for x in all_devices[deviceNum].interfaces:
                    if x["IPv4"] != 'unassigned':
                        used_IPs.append(x["IPv4"])
                        if x["IPv4"] in unused_IPs:
                            unused_IPs.remove(x["IPv4"])

                if ip not in used_IPs:
                    used_IPs.append(ip)

                for x in neighbor_device:
                    if x[2] not in used_IPs:
                        if x[2] not in unused_IPs:
                            unused_IPs.append(x[2])

                if ip in unused_IPs: 
                    unused_IPs.remove(ip)

                if len(unused_IPs) >= 1:
                    deviceNum += 1
                    ip = unused_IPs[0]

                #print('Usadas:',used_IPs,'No usadas: ',unused_IPs)

                for x in unused_IPs:
                    if x in used_IPs:
                        unused_IPs.remove(x)

                if len(unused_IPs) == 0:
                    break
        except Exception as error:
            print(json.dumps("Error al guardar la configuracio"))