# app.py
from flask import Flask, request, jsonify
from config import get_connection

app = Flask(__name__)

# Create (POST)
@app.route('/clientes', methods=['POST'])
def crear_cliente():
    data = request.get_json()
    conn = get_connection()
    cursor = conn.cursor()
    # CAMBIO: ? por %s
    cursor.execute("INSERT INTO Cliente (id_cliente, nombre, telefono) VALUES (%s, %s, %s)",
                   (data['id_cliente'], data['nombre'], data['telefono']))
    conn.commit()
    conn.close()
    return jsonify({'mensaje': 'Cliente creado'}), 201

# Read All (GET)
@app.route('/clientes', methods=['GET'])
def obtener_clientes():
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT id_cliente, nombre, telefono FROM Cliente")
    clientes = [{'id_cliente': row[0], 'nombre': row[1], 'telefono': row[2]} for row in cursor.fetchall()]
    conn.close()
    return jsonify(clientes)

# Read One (GET)
@app.route('/clientes/<int:id_cliente>', methods=['GET'])
def obtener_cliente(id_cliente):
    conn = get_connection()
    cursor = conn.cursor()
    # CAMBIO: ? por %s
    cursor.execute("SELECT id_cliente, nombre, telefono FROM Cliente WHERE id_cliente = %s", (id_cliente,))
    row = cursor.fetchone()
    conn.close()
    if row:
        return jsonify({'id_cliente': row[0], 'nombre': row[1], 'telefono': row[2]})
    return jsonify({'mensaje': 'Cliente no encontrado'}), 404

# Update (PUT)
@app.route('/clientes/<int:id_cliente>', methods=['PUT'])
def actualizar_cliente(id_cliente):
    data = request.get_json()
    conn = get_connection()
    cursor = conn.cursor()
    # CAMBIO: ? por %s
    cursor.execute("UPDATE Cliente SET nombre = %s, telefono = %s WHERE id_cliente = %s",
                   (data['nombre'], data['telefono'], id_cliente))
    conn.commit()
    conn.close()
    return jsonify({'mensaje': 'Cliente actualizado'})

# Delete (DELETE)
@app.route('/clientes/<int:id_cliente>', methods=['DELETE'])
def eliminar_cliente(id_cliente):
    conn = get_connection()
    cursor = conn.cursor()
    # CAMBIO: ? por %s
    cursor.execute("DELETE FROM Cliente WHERE id_cliente = %s", (id_cliente,))
    conn.commit()
    conn.close()
    return jsonify({'mensaje': 'Cliente eliminado'})

if __name__ == '__main__':
    app.run(debug=True)