from Devices import Device
import time
import concurrent.futures
from functions import get_device_neighbor_details, get_device_info

# Inicio del tiempo
inicio = time.time()

if __name__ == "__main__":

    all_devices = []
    used_IPs = []
    unused_IPs = []

    ip = "192.168.10.1"#input("Hola ip")
    username = "gmedina"# input("Hola username")
    password ="cisco" #input("Hola password")
    secret = "cisco"#input("Hola secret")

    while True:

        with concurrent.futures.ThreadPoolExecutor(max_workers=2) as executor:
            # Lanzamos las tareas
            device = executor.submit(get_device_info,ip,username,password,secret)
            neighbor =executor.submit(get_device_neighbor_details,ip,username,password,secret)
            # Obtenemos los resultados
            current_device = device.result()
            neighbor_device,type = neighbor.result()


        #for i in current_device:
        #   print('\n',i,'\n')
        #for k in current_device[0]:
        #  print("\n",k,"\n")
        #for h in current_device[1]:
        #   print("\n",h,"\n")
        #for x in neighbor_device:
        #   print('\n',x,'\n')

        #print(neighbor_device[0])

        #creo un objeto tipo device

        device = Device(ip)

        device.set_interfaces(current_device[0],current_device[1])

        for x in range(len(neighbor_device)):
            if neighbor_device[x][0] == current_device[0][0]:
                break
            device.set_connections(neighbor_device[x][4],ip, type[2], neighbor_device[x][5], neighbor_device[x][2])

        all_devices.append(device)

        used_IPs.append(ip)

        for x in neighbor_device:
            unused_IPs.append(x[2])

        print(unused_IPs," and ",used_IPs)

        for x in used_IPs:
            if x in unused_IPs:
                unused_IPs.remove(x)
                
        if len(unused_IPs) > 0:
            ip = unused_IPs[0]

        for x in all_devices:
            print(x)
        
        if len(unused_IPs) == 0:
            pass
        break

    # Fin del tiempo
    fin = time.time()
    # Cálculo del tiempo transcurrido
    tiempo_transcurrido = fin - inicio
    print("Tiempo transcurrido:", tiempo_transcurrido, "segundos")
    

    
    

# [nombre del host, tipo de dispositivo, ip del dispositivo, dispositivo cisco, desde donde se conecta, a donde se conecta, version]

#[['R1', 'Switch', '192.168.10.2', 'cisco WS-C2960-24TT-L', 'GigabitEthernet0/1', 'GigabitEthernet0/0', 'Cisco IOS Software, C2960 Software (C2960-LANBASEK9-M), Version 15.0(2)SE4, RELEASE SOFTWARE (fc1)']]