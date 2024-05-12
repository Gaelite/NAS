import sqlite3

# Function to create the database schema
def create_database_schema():
    conn = sqlite3.connect('network_data.db')
    c = conn.cursor()

    # Create tables for devices, interfaces, and connections
    c.execute('''CREATE TABLE IF NOT EXISTS devices (
                    id INTEGER PRIMARY KEY,
                    deviceType TEXT,
                    ip TEXT,
                    SystemVersion TEXT,
                    Model TEXT,
                    Serie TEXT
                )''')

    c.execute('''CREATE TABLE IF NOT EXISTS interfaces (
                    id INTEGER PRIMARY KEY,
                    device_id INTEGER,
                    interface TEXT,
                    IPv4 TEXT,
                    IPv6 TEXT,
                    link_local TEXT,
                    FOREIGN KEY(device_id) REFERENCES devices(id)
                )''')

    c.execute('''CREATE TABLE IF NOT EXISTS connections (
                    id INTEGER PRIMARY KEY,
                    device_id INTEGER,
                    connected_from_interface TEXT,
                    from_ip TEXT,
                    connected_to_device TEXT,
                    connected_to_interface TEXT,
                    to_ip TEXT,
                    FOREIGN KEY(device_id) REFERENCES devices(id)
                )''')

    conn.commit()
    conn.close()

# Function to insert data into the database
def insert_data(json_data):
    conn = sqlite3.connect('network_data.db')
    c = conn.cursor()

    for device in json_data:
        # Insert device information
        c.execute('INSERT INTO devices (deviceType, ip, SystemVersion, Model, Serie) VALUES (?, ?, ?, ?, ?)',
                  (device['deviceType'], device['ip'], device['SystemVersion'], device['Model'], device['Serie']))
        device_id = c.lastrowid

        # Insert interfaces
        for interface in device['interfaces']:
            c.execute('INSERT INTO interfaces (device_id, interface, IPv4, IPv6, link_local) VALUES (?, ?, ?, ?, ?)',
                      (device_id, interface['Interface'], interface['IPv4'], interface['IPv6'], interface['Link-local']))

        # Insert connections
        for connection in device['connections']:
            c.execute('INSERT INTO connections (device_id, connected_from_interface, from_ip, connected_to_device, connected_to_interface, to_ip) VALUES (?, ?, ?, ?, ?, ?)',
                      (device_id, connection['Connected_from_Interface'], connection['From_IP'], connection['Device'], connection['Connected_to_Interface'], connection['To_IP']))
        
    conn.commit()
    conn.close()

create_database_schema()

 



