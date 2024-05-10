import sqlite3

def execute_query(table, query):
    conn = sqlite3.connect('network_data.db')
    c = conn.cursor()

    try:
        c.execute(f"SELECT * FROM {table} {query}")
        rows = c.fetchall()
        return rows
    except sqlite3.Error as e:
        print("Error executing query:", e)
        return None
    finally:
        conn.close()

table_name = "devices"
query = ""
result = execute_query(table_name, query)
print(result)
