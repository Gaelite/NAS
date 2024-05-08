import sys

from functions import (
    change_hostname,            #1
    change_int_ip,              #2
    change_int_desc,            #3
    change_motd,                #4
    change_intv6_ip,            #5
    ipv6_unicast,               #6
    ip_route,                   #7
    ipv6_route,                 #8
    new_user,                   #9
    loggin_syn,                 #10
    conf_syslog,                #11
    dhcp_v4,                    #12
    ssh_authentication_retry,   #13
    ssh_time_out,               #14
    save_config,                #15
    password_encryption,        #16
    show_runn
)

opc = sys.argv[1]
device_ip = sys.argv[2]
username = sys.argv[3]
password = sys.argv[4]

if opc == 'hostname':
    hostname = sys.argv[5]
    change_hostname(device_ip, username, password, hostname)
elif opc == 'int_ip':
    ip = sys.argv[5]
    mask = sys.argv[6]
    interface = sys.argv[7]
    change_int_ip(device_ip, username, password,ip,mask,interface)
elif opc == change_int_desc:
    interface = sys.argv[5]
    desc = sys.argv[6]
    change_int_desc(device_ip, username, password,interface,desc)
elif opc == 'motd':
    motd = sys.argv[5]
    change_motd(device_ip, username, password, motd)
elif opc == 'intv6_ip':
    ipv6 = sys.argv[5]
    mask = sys.argv[6]
    interface = sys.argv[7]
    change_intv6_ip(device_ip, username, password,ipv6,mask,interface)
elif opc == 'unicast':
    ipv6_unicast(device_ip, username, password)
elif opc == 'rute':
    ip = sys.argv[5]
    mask = sys.argv[6]
    rute = sys.argv[7]
    da = sys.argv[8]
    ip_route(device_ip, username, password,ip,mask,rute,da)
elif opc == 'rutev6':
    ipv6 = sys.argv[5]
    mask = sys.argv[6]
    rute = sys.argv[7]
    ipv6_route(device_ip, username, password,ipv6,mask,rute)
elif opc == 'user':
    user = sys.argv[5]
    priv = sys.argv[6]
    secret = sys.argv[7]
    new_user(device_ip, username, password,user,priv,secret)
elif opc == 'logginsyn':
    loggin_syn(device_ip, username, password)
elif opc == 'syslog':
    serverIp = sys.argv[5]
    conf_syslog(device_ip, username, password, serverIp)
elif opc == 'dhcp4':
    dhcpPool = sys.argv[5]
    interfaceIp = sys.argv[6]
    network = sys.argv[7]
    mask = sys.argv[7]
    dnsServer = sys.argv[7]
    domainName = sys.argv[7]
    dhcp_v4(device_ip, username, password, dhcpPool,interfaceIp, network, mask, dnsServer, domainName)
elif opc == 'sshAu':
    retries = sys.argv[5]
    ssh_authentication_retry(device_ip, username, password, retries)
elif opc == 'sshTime':
    timeOut = sys.argv[5]
    ssh_time_out(device_ip, username, password, timeOut)
elif opc == 'saveRunn':
    save_config(device_ip, username, password)
elif opc == 'encryption':
    password_encryption(device_ip, username, password)
    
elif opc == 'show_runn':
    serverIp = sys.argv[5]
    show_runn(device_ip, username, password)
