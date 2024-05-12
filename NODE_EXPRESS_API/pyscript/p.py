from netmiko import ConnectHandler
import textfsm
from functions import get_device_neighbor_details, get_device_info
device = {
        'device_type': 'cisco_ios', 
        'host': '192.168.1.1',
        'username': 'gmedina',
        'password': 'cisco',
        'secret': 'cisco'
    }

cdp_template = textfsm.TextFSM(open("Templates/cisco_ios_show_version.textfsm"))

ssh_session = ConnectHandler(**device)
cdp_result= ssh_session.find_prompt() + "\n"#Te da el modo actual de CLI junto con el nombre del host

cdp_result += ssh_session.send_command("show version", delay_factor=2)#te consigue la informacion CD
    #procesar info para enviar a servidor
fsm_cdp_results = cdp_template.ParseText(cdp_result)
y = 0
print(fsm_cdp_results[0][4])
for x in fsm_cdp_results[0]:
    print(f'{y}. {x}\n')
    y += 1
ssh_session.disconnect()