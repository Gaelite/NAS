from netmiko import ConnectHandler
import textfsm
from functions import get_device_neighbor_details, get_device_info
device = {
        'device_type': 'cisco_ios', 
        'host': '192.168.3.2',
        'username': 'gmedina',
        'password': 'cisco',
        'secret': 'cisco'
    }

cdp_template = textfsm.TextFSM(open("Templates/show_ip_nat_statistics.textfsm"))

ssh_session = ConnectHandler(**device)
cdp_result= ssh_session.find_prompt() + "\n"#Te da el modo actual de CLI junto con el nombre del host

cdp_result += ssh_session.send_command("show ip nat statistics", delay_factor=2)#te consigue la informacion CD

res = cdp_template.ParseText(cdp_result)

print(res)