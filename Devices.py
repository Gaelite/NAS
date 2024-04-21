class Device:
    def __init__(self,deviceType,ip,intInfo,intv6Info):
        self.deviceType = deviceType
        self.ip = ip
        self.intInfo = intInfo
        self.intv6Info = intv6Info
        self.connections = []

    def update_connections(self,From_interface,To_interface,IP_Connected):
        for x in self.connections:
            if x["IP"] == IP_Connected:
                return False
        self.connections += [
            {"Connected_from_Interface":f'{From_interface}',"Connected_to_Interface":f'{To_interface}',"IP":f"{IP_Connected}"}
            ]
        
    def __str__(self):
        device_str = f"Device Type: {self.deviceType}\n"
        device_str += f"IP Address: {self.ip}\n"
        device_str += f"Interface Info: {self.intInfo}\n"
        device_str += f"IPv6 Interface Info: {self.intv6Info}\n"

        if self.connections:
            device_str += "Connections:\n"
            for conn in self.connections:
                device_str += f"- From Interface: {conn['Connected_from_Interface']}, To Interface: {conn['Connected_to_Interface']}, IP: {conn['IP']}\n"
        else:
            device_str += "No connections."

        return device_str
