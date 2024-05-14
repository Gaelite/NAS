from netmiko import ConnectHandler
import textfsm
from functions import get_device_neighbor_details, get_device_info, getSerial
device = {
        'device_type': 'cisco_ios', 
        'host': '192.168.1.1',
        'username': 'gmedina',
        'password': 'cisco',
        'secret': 'cisco'
    }

    #procesar info para enviar a servidor
fsm_cdp_results = getSerial('192.168.1.1', 'gmedina', 'cisco', 'cisco')
print(fsm_cdp_results)