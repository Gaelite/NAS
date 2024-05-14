import sys
import json

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
secret = sys.argv[5]

if opc == 'hostname':
    hostname = sys.argv[6]
    change_hostname(device_ip, username, password,secret, hostname)
elif opc == 'int_ip':
    ip = sys.argv[6]
    mask = sys.argv[7]
    interface = sys.argv[8]
    change_int_ip(device_ip, username, password,secret,ip,mask,interface)
elif opc == 'change_int_desc':
    interface = sys.argv[6]
    desc = sys.argv[7]
    print(interface)
    print(desc)
    change_int_desc(device_ip, username, password,secret,interface,desc)
elif opc == 'motd':
    motd = sys.argv[6]
    change_motd(device_ip, username, password,secret, motd)
elif opc == 'intv6_ip':
    ipv6 = sys.argv[6]
    mask = sys.argv[7]
    interface = sys.argv[8]
    change_intv6_ip(device_ip, username, password, secret,ipv6,mask,interface)
elif opc == 'unicast':
    ipv6_unicast(device_ip, username, password,secret)
elif opc == 'rute':
    ip = sys.argv[6]
    mask = sys.argv[7]
    rute = sys.argv[8]
    da = sys.argv[9]
    ip_route(device_ip, username, password,secret,ip,mask,rute,da)
elif opc == 'rutev6':
    ipv6 = sys.argv[6]
    mask = sys.argv[7]
    rute = sys.argv[8]
    da = sys.argv[9]
    ipv6_route(device_ip, username, password,secret,ipv6,mask,rute,da)
elif opc == 'user':
    user = sys.argv[6]
    priv = sys.argv[7]
    secretPass = sys.argv[8]
    new_user(device_ip, username, password,secret,user,priv,secretPass)
elif opc == 'logginsyn':
    loggin_syn(device_ip, username, password,secret)
elif opc == 'syslog':
    serverIp = sys.argv[6]
    conf_syslog(device_ip, username, password,secret, serverIp)
elif opc == 'dhcp4':
    dhcpPool = sys.argv[6]
    interfaceIp = sys.argv[7]
    network = sys.argv[8]
    mask = sys.argv[9]
    dnsServer = sys.argv[10]
    domainName = sys.argv[11]
    dhcp_v4(device_ip, username, password,secret, dhcpPool,interfaceIp, network, mask, dnsServer, domainName)
elif opc == 'sshAu':
    retries = sys.argv[6]
    ssh_authentication_retry(device_ip, username, password,secret, retries)
elif opc == 'sshTime':
    timeOut = sys.argv[6]
    ssh_time_out(device_ip, username, password,secret, timeOut)
elif opc == 'saveRunn':
    save_config(device_ip, username, password,secret)
elif opc == 'encryption':
    password_encryption(device_ip, username, password,secret)
    
elif opc == 'show_runn':
    show_runn(device_ip, username, password,secret)
