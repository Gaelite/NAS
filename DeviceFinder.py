import socket
import textfsm
from netmiko import ConnectHandler
from Devices import Device

cdp_template = textfsm.TextFSM(open("show_cdp_neighbor_detail.textfsm"))
int_brief_template = textfsm.TextFSM(open("cisco_ios_show_ip_interface_brief.textfsm"))
intv6_brief_template = textfsm.TextFSM(open("cisco_ios_show_ipv6_interface_brief.textfsm"))
cdpv6_template = textfsm.TextFSM(open("cisco_ios_show_ipv6_neighbors.textfsm"))

def get_device_neighbor_details(ip, username, password, enable_secret):
    try:
        #Inicia SSH
        ssh_connection = ConnectHandler(
            device_type='cisco_ios',
            ip=ip,
            username=username,
            password=password,
            secret=enable_secret
        )
    except Exception as error:
        return error

    ssh_connection.enable()#Activa modo EXEC privilegiado

    cdp_result,cdpv6_result= ssh_connection.find_prompt() + "\n"#Te da el modo actual de CLI junto con el nombre del host

    #Informacion de vecinos
    cdp_result += ssh_connection.send_command("show cdp neighbor detail", delay_factor=2)#te consigue la informacion CDP

    #Desconectar SSH
    ssh_connection.disconnect()

    #procesar info para enviar a servidor
    fsm_cdp_results = cdp_template.ParseText(cdp_result)

    return fsm_cdp_results

def get_device_info(ip, username, password, enable_secret):
    try:
        #Inicia SSH
        ssh_connection = ConnectHandler(
            device_type='cisco_ios',
            ip=ip,
            username=username,
            password=password,
            secret=enable_secret
        )
    except Exception as error:
        return error

    ssh_connection.enable()#Activa modo EXEC privilegiado

    int_brief_result,intv6_brief_result = ssh_connection.find_prompt() + "\n"#Te da el modo actual de CLI junto con el nombre del host

    #Informacion de interfaces
    int_brief_result += ssh_connection.send_command("show ip interface brief", delay_factor=2)#te consigue la informacion de interfaces del dispositivo

    inv6_brief_result += ssh_connection.send_command("show ipv6 interface brief", delay_factor=2)#te consigue la informacion de interfaces del dispositivo

    #Desconectar SSH
    ssh_connection.disconnect()

    #procesar info para enviar a servidor
    fsm_int_results = cdp_template.ParseText(int_brief_result)
    fsm_intv6_results = cdp_template.ParseText(intv6_brief_result)

    result =[[fsm_int_results],[fsm_intv6_results]]

    return result

if __name__ == "__main__":

    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.connect(("127.0.0.1", 12345))
    
    all_devices = []
    used_IPs = []

    while True:
        ip = input("Hola ip")
        username = input("Hola username")
        password = input("Hola password")
        secret = input("Hola secret")

        current_device = get_device_info(ip,username,password,secret)

        neighbor_device = get_device_neighbor_details(ip,username,password,secret)

        #creo un objeto tipo device
        device = Device(ip,current_device[0][0],ip,current_device[0],current_device[1])

        for x in range(0,neighbor_device.length):
            if neighbor_device[x][0] == current_device[0][0]:
                break

        device.update_connections(neighbor_device[x][4],neighbor_device[x][5],neighbor_device[x][2])

        all_devices.append(device)

        used_IPs.append(ip)

        ip = neighbor_device[0][2]

    
    

# [nombre del host, tipo de dispositivo, ip del dispositivo, dispositivo cisco, desde donde se conecta, a donde se conecta, version]

#[['R1', 'Switch', '192.168.10.2', 'cisco WS-C2960-24TT-L', 'GigabitEthernet0/1', 'GigabitEthernet0/0', 'Cisco IOS Software, C2960 Software (C2960-LANBASEK9-M), Version 15.0(2)SE4, RELEASE SOFTWARE (fc1)']]
