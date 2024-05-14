from pysnmp.hlapi import *


ip_address = '192.168.1.1'  # Dirección IP del dispositivo
snmp_port = 161  #Puerto default
community_string = 'cisco'  #Contraseña se tiene que configurar en el router
oid = '1.3.6.1.4.1.9.9.109.1.1.1.1.8'  #Identificador del uso de cpu 
      #1.3.6.1.4.1.9.9.48.1.1.1.5 Memoria ram falta probarlo no se si sea
      #1.3.6.1.2.1.47.1.1.1.1.11 Numero de serie


#Crear la solicitud SNMP
g = getCmd(SnmpEngine(),
           CommunityData(community_string),
           UdpTransportTarget((ip_address, snmp_port)),
           ContextData(),
           ObjectType(ObjectIdentity(oid)))

# Obtener el siguiente 
response = next(g)

# Interpretar la respuesta
error_indication, error_status, error_index, var_binds = response

# Verificar si hubo errores
if error_indication:
    print(f'Error: {error_indication}')
else:
    if error_status:
        print(f'Error: {error_status.prettyPrint()} at {error_index and var_binds[int(error_index) - 1][0] or "?"}')
    else:
        # Imprimir los resultados
        for var_bind in var_binds:
            print(f'{var_bind[0]} = {var_bind[1]}')