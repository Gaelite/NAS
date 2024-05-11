import sqlite3

def query_data_from_database():
    try:
        conn = sqlite3.connect('C:/Users/eduar/OneDrive/Documentos/MisProyectos/NAS/NODE_EXPRESS_API/pyscript/network_data.db')  
        c = conn.cursor()

        # Ejemplo de consulta para obtener los dispositivos y sus interfaces
        c.execute('''SELECT d.deviceType, d.ip, i.interface, i.IPv4, i.IPv6 FROM devices AS d
                     INNER JOIN interfaces AS i ON d.id = i.device_id''')
        rows = c.fetchall()

        # Imprimir los resultados
        for row in rows:
            print(row)

        conn.close()
    except Exception as e:
        print("Error:", e)

print('1')
query_data_from_database()
