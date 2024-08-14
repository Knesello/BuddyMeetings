import sqlite3
import datetime

def init_db():
    conn = sqlite3.connect('pairings.db')
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS pairings
                 (id INTEGER PRIMARY KEY, name TEXT, buddy TEXT, last_request_time TEXT)''')
    conn.commit()
    conn.close()

def get_or_create_pair(name):
    conn = sqlite3.connect('pairings.db')
    c = conn.cursor()
    
    c.execute('SELECT buddy, last_request_time FROM pairings WHERE name = ?', (name,))
    result = c.fetchone()
    
    if result:
        buddy, last_request_time = result
        last_request_time = datetime.datetime.strptime(last_request_time, '%Y-%m-%d %H:%M:%S')
        if (datetime.datetime.now() - last_request_time).days < 14:
            conn.close()
            return buddy
    
    c.execute('SELECT name FROM pairings WHERE buddy IS NULL OR (julianday(\'now\') - julianday(last_request_time)) >= 14')
    available_buddies = c.fetchall()
    available_buddies = [b[0] for b in available_buddies if b[0] != name]
    
    if available_buddies:
        buddy = available_buddies[0]
        current_time = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        c.execute('INSERT OR REPLACE INTO pairings (name, buddy, last_request_time) VALUES (?, ?, ?)', (name, buddy, current_time))
        c.execute('INSERT OR REPLACE INTO pairings (name, buddy, last_request_time) VALUES (?, ?, ?)', (buddy, name, current_time))
        conn.commit()
        conn.close()
        return buddy
    else:
        conn.close()
        return None

init_db()
