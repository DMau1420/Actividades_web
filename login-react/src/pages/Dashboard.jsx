import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProfileAPI, logoutAPI } from '../services/authService';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Apenas carga la pantalla, pedimos el perfil a la API
    getProfileAPI()
      .then(datos => {
        setUser(datos);
        setLoading(false);
      })
      .catch(() => {
        // Si el token falló, limpiamos y mandamos al login
        logoutAPI();
        navigate('/login');
      });
  }, [navigate]);

  const cerrarSesion = () => {
    logoutAPI();
    navigate('/login');
  };

  // Mientras la API responde, mostramos un spinner
  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-2">Verificando credenciales...</p>
      </div>
    );
  }
   return (
    <div className="container mt-4">
      {/* Navbar de bienvenida */}
      <nav className="navbar navbar-light bg-light rounded shadow-sm mb-4 px-4">
        <span className="navbar-brand mb-0 h1 d-flex align-items-center">
          <img src={user.avatar} width="40" className="rounded-circle me-3" alt="avatar" />
          ¡Hola, {user.name}!
        </span>
        <button className="btn btn-outline-danger" onClick={cerrarSesion}>Cerrar Sesión</button>
      </nav>

      {/* ROL: ADMINISTRADOR */}
      {user.role === 'admin' ? (
        <div className="row">
          <div className="col-12">
            <div className="card border-primary shadow">
              <div className="card-header bg-primary text-white fw-bold">
                🛠️ Panel de Control de Administrador
              </div>
              <div className="card-body">
                <h5 className="card-title">Gestión de Usuarios</h5>
                <p className="card-text">Bienvenido al área segura. Desde aquí puedes modificar el sistema.</p>
                
                <table className="table table-striped mt-3">
                  <thead className="table-dark">
                    <tr><th>ID</th><th>Usuario</th><th>Acciones</th></tr>
                  </thead>
                  <tbody>
                    <tr><td>1</td><td>Juan Pérez</td><td><button className="btn btn-sm btn-warning">Editar</button></td></tr>
                    <tr><td>2</td><td>Ana Gómez</td><td><button className="btn btn-sm btn-warning">Editar</button></td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* ROL: CLIENTE / CUSTOMER */
        <div className="row justify-content-center mt-5">
          <div className="col-md-8">
            <div className="card border-info shadow text-center p-5">
              <h2 className="text-info mb-3">Panel de Consulta</h2>
              <p className="lead">Tienes un perfil básico (Customer). No tienes permisos para administrar usuarios o ver la base de datos completa.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
