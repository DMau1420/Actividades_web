# config.py
import pymysql


def get_connection():
    conn = pymysql.connect(
        host='localhost',
        port=3306,
        database='testdb',
        user='mau',
        password='mau1234' 
    )
    return conn
