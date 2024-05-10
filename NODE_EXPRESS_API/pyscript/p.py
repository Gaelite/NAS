from netmiko import ConnectHandler
import textfsm
from functions import get_device_neighbor_details, get_device_info
device = {
        'device_type': 'cisco_ios', 
        'host': '192.168.1.2',
        'username': 'gmedina',
        'password': 'cisco',
    }

cdp_template = textfsm.TextFSM(open("Templates/cisco_ios_show_version.textfsm"))
try:
    ssh_session = ConnectHandler(**device)
    cdp_result= ssh_session.find_prompt() + "\n"#Te da el modo actual de CLI junto con el nombre del host

    cdp_result += ssh_session.send_command("show version", delay_factor=2)#te consigue la informacion CD
    #procesar info para enviar a servidor
    fsm_cdp_results = cdp_template.ParseText(cdp_result)
    print(fsm_cdp_results)
    ssh_session.disconnect()
except Exception as e:
    print("Error al iniciar sesión SSH:", str(e))