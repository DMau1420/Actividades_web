import { useState, useEffect, useMemo } from 'react';
import { getUsers, createUser, updateUser, deleteUser } from './services/userService';
import TablaUsuarios from './components/TablaUsuarios';
import ModalUsuario from './components/ModalUsuario';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import 'bootstrap/dist/css/bootstrap.min.css';

const USUARIO_VACIO = { name: '', email: '', password: '', avatar: 'https://i.imgur.com/LDOO4Qs.jpg', role: 'customer' };

export default function App() {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [filtros, setFiltros] = useState({ name: '', email: '' });
  
  // Estado Modal
  const [verModal, setVerModal] = useState(false);
  const [usuarioEdicion, setUsuarioEdicion] = useState(USUARIO_VACIO);

  useEffect(() => {
    getUsers().then(data => setUsers(data));
  }, []);

  const usuariosFiltrados = useMemo(() => {
    return users.filter(u => 
      u.name.toLowerCase().includes(filtros.name.toLowerCase()) &&
      u.email.toLowerCase().includes(filtros.email.toLowerCase())
    );
  }, [users, filtros]);

  // Funciones Tabla
  const manejarFiltrar = (campo, valor) => setFiltros({ ...filtros, [campo]: valor });
  
  const manejarToggleCheck = (user, checked) => {
    if (checked) setSelectedUsers([...selectedUsers, user]);
    else setSelectedUsers(selectedUsers.filter(u => u.id !== user.id));
  };

  const manejarSelectAll = (checked) => {
    if (checked) setSelectedUsers([...usuariosFiltrados]);
    else setSelectedUsers([]);
  };

  // Funciones CRUD
  const abrirNuevo = () => {
    setUsuarioEdicion(USUARIO_VACIO);
    setVerModal(true);
  };

  const prepararEdicion = (user) => {
    setUsuarioEdicion({ ...user });
    setVerModal(true);
  };

  const guardarUsuario = (user) => {
    if (user.id) {
      updateUser(user.id, user).then(res => {
        setUsers(users.map(u => u.id === res.id ? res : u));
        setVerModal(false);
      });
    } else {
      createUser(user).then(res => {
        setUsers([res, ...users]);
        setVerModal(false);
      });
    }
  };

  const eliminarUsuario = (id) => {
    deleteUser(id).then(() => {
      setUsers(users.filter(u => u.id !== id));
      setSelectedUsers(selectedUsers.filter(u => u.id !== id));
    });
  };

  const generarPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Reporte de Alumnos - Tecnológico Nacional de México', 14, 20);
    doc.setFontSize(12);
    doc.text('Campus San Juan del Río', 14, 28);
    
    const datos = selectedUsers.map(u => [u.id, u.name, u.email]);
    
    autoTable(doc, {
      startY: 35,
      head: [['ID', 'Nombre', 'Correo']],
      body: datos,
      theme: 'grid',
      headStyles: { fillColor: [27, 57, 106] }
    });
    doc.save('alumnos_sjr.pdf');
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between mb-3">
        <h2>Control de Usuarios</h2>
        <div>
          <button className="btn btn-primary me-2" onClick={abrirNuevo}>Nuevo Usuario</button>
          <button className="btn btn-danger" disabled={selectedUsers.length === 0} onClick={generarPDF}>
            Descargar PDF ({selectedUsers.length})
          </button>
        </div>
      </div>

      <TablaUsuarios 
        usuarios={usuariosFiltrados}
        seleccionados={selectedUsers}
        alEditar={prepararEdicion}
        alEliminar={eliminarUsuario}
        alToggleCheck={manejarToggleCheck}
        alSelectAll={manejarSelectAll}
        alFiltrar={manejarFiltrar}
      />

      {verModal && (
        <ModalUsuario 
          usuario={usuarioEdicion}
          alGuardar={guardarUsuario}
          alCancelar={() => setVerModal(false)}
        />
      )}
    </div>
  );
}