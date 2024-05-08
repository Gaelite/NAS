from Devices import Device
import time
import sys
import concurrent.futures
from functions import get_device_neighbor_details, get_device_info
import json
import sqlite3



def insert_data_to_database(data):
    try:
        conn = sqlite3.connect('C:/Users/valen/OneDrive/Documents/FINALREDES/NAS/network_data.db')  
        c = conn.cursor()

        for device in data:
            c.execute('''INSERT INTO devices (deviceType, ip) VALUES (?, ?)''', (device['deviceType'], device['ip']))
            device_id = c.lastrowid

            for interface in device['interfaces']:
                c.execute('''INSERT INTO interfaces (device_id, interface, IPv4, IPv6, link_local) VALUES (?, ?, ?, ?, ?)''',
                          (device_id, interface['Interface'], interface['IPv4'], interface['IPv6'], interface['Link-local']))

            for connection in device['connections']:
                c.execute('''INSERT INTO connections (device_id, connected_from_interface, from_ip, connected_to_device, connected_to_interface, to_ip) VALUES (?, ?, ?, ?, ?, ?)''',
                          (device_id, connection['Connected_from_Interface'], connection['From_IP'], connection['Device'], connection['Connected_to_Interface'], connection['To_IP']))

        conn.commit()
        conn.close()
        print("Success")
    except Exception as e:
        print("Error:", e)

try:
    if __name__ == "__main__":

        all_devices = []
        used_IPs = []
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
            with concurrent.futures.ThreadPoolExecutor(max_workers=2) as executor:
                # Lanzamos las tareas
                devicet = executor.submit(get_device_info,ip,username,password,secret)
                neighbor =executor.submit(get_device_neighbor_details,ip,username,password,secret,SyslogServer)
                # Obtenemos los resultados
                current_device = devicet.result()#aqui no jala
                neighbor_device,type = neighbor.result()#aqui no jala

                #creo un objeto tipo device

                all_devices.append(Device(ip))      
                all_devices[deviceNum].set_interfaces(current_device[0],current_device[1])

                for x in range(len(neighbor_device)):
                    all_devices[deviceNum].interfaces
                    if neighbor_device[x][0] == current_device[0][0]:
                        break
                    for z in all_devices[deviceNum].interfaces:
                        if z["Interface"] == neighbor_device[x][5] or z["Interface"] == "Vlan1":
                            local_Ip = z["IPv4"]
                            all_devices[deviceNum].set_connections(neighbor_device[x][4],local_Ip, type[x][2], neighbor_device[x][5], neighbor_device[x][2])

                for x in all_devices[deviceNum].interfaces:
                    if x["IPv4"] != 'unassigned':
                        used_IPs.append(x["IPv4"])
                    

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

                for x in unused_IPs:
                    if x in used_IPs:
                        unused_IPs.remove(x)

                if len(unused_IPs) == 0:
                    break

        for device in all_devices:
            interfaces = [{'Interface': i['Interface'], 'IPv4': i['IPv4'], 'IPv6': i['IPv6'], 'Link-local': i['Link-local']} for i in device.interfaces]
            connections = [{'Connected_from_Interface': c['Connected_from_Interface'], 'From_IP': c['From_IP'], 'Device': c['Device'], 'Connected_to_Interface': c['Connected_to_Interface'], 'To_IP': c['To_IP']} for c in device.connections]
            json_Pack.append({
                'deviceType': device.deviceType,
                'ip': device.ip,
                'interfaces': interfaces,
                'connections': connections
            })
            ind += 1
        res = json.dumps(json_Pack)
        insert_data_to_database(json_Pack)

        print(res)
except Exception as error:
        print("Error:",error)