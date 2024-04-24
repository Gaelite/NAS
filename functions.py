import textfsm
from netmiko import ConnectHandler

cdp_template = textfsm.TextFSM(open("Templates/show_cdp_neighbor_detail.textfsm"))
type_template = textfsm.TextFSM(open("Templates/cisco_ios_show_cdp_neighbors.textfsm"))
int_brief_template = textfsm.TextFSM(open("Templates/cisco_ios_show_ip_interface_brief.textfsm"))
intv6_brief_template = textfsm.TextFSM(open("Templates/cisco_ios_show_ipv6_interface_brief.txtfsm"))
cdpv6_template = textfsm.TextFSM(open("Templates/cisco_ios_show_ipv6_neighbors.textfsm"))

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

    cdp_result= ssh_connection.find_prompt() + "\n"#Te da el modo actual de CLI junto con el nombre del host
    type_result = cdp_result


    #Informacion de vecinos
    cdp_result += ssh_connection.send_command("show cdp neighbor detail", delay_factor=2)#te consigue la informacion CDP
    type_result += ssh_connection.send_command("show cdp neighbor", delay_factor=2)#te consigue la informacion CDP

    #Desconectar SSH
    ssh_connection.disconnect()

    #procesar info para enviar a servidor
    fsm_cdp_results = cdp_template.ParseText(cdp_result)
    fsm_type_results = type_template.ParseText(type_result)

    print(fsm_type_results)

    return fsm_cdp_results,fsm_type_results

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

    int_brief_result = ssh_connection.find_prompt() + "\n"#Te da el modo actual de CLI junto con el nombre del host
    intv6_brief_result = int_brief_result
    #Informacion de interfaces
    int_brief_result += ssh_connection.send_command("show ip interface brief", delay_factor=2)#te consigue la informacion de interfaces del dispositivo

    intv6_brief_result += ssh_connection.send_command("show ipv6 interface brief", delay_factor=2)#te consigue la informacion de interfaces del dispositivo

    #Desconectar SSH
    ssh_connection.disconnect()

    #procesar info para enviar a servidor
    fsm_int_results = int_brief_template.ParseText(int_brief_result)
    fsm_intv6_results = intv6_brief_template.ParseText(intv6_brief_result)

    for x in fsm_intv6_results:
        if x[1][0] == "unassigned":
            x[1].append("unassigned")

    result =[fsm_int_results,fsm_intv6_results]

    return result