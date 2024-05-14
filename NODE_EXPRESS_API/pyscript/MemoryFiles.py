from netmiko import ConnectHandler
import sys
import json
from functions import get_device_info
from Devices import Device

x = get_device_info(sys.argv[1],sys.argv[2],sys.argv[3],sys.argv[4])
device = Device(sys.argv[1])
device.set_interfaces(x[0],x[1], "Device")
res = device.get_interfaces()
print(res)

