import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginAPI } from '../services/authService';

export default function Login() {
  // Estados para capturar lo que el usuario escribe
  const [email, setEmail] = useState('john@mail.com');
  const [password, setPassword] = useState('changeme');
  const [error, setError] = useState(false);
  
  const navigate = useNavigate(); // Herramienta para cambiar de pantalla

  const manejarSubmit = async (e) => {
    e.preventDefault(); // Evita que el navegador se recargue al enviar el formulario
    try {
      await loginAPI(email, password);
      navigate('/dashboard'); // Login exitoso -> vamos adentro
    } catch (err) {
      setError(true); // Login fallido -> mostramos error
          }
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card shadow-lg" style={{ width: '100%', maxWidth: '400px' }}>
        <div className="card-header bg-dark text-white text-center py-3">
          <h4 className="mb-0">Acceso al Sistema</h4>
        </div>
        
        <div className="card-body p-4">
          {error && <div className="alert alert-danger">Correo o contraseña incorrectos.</div>}
          
          <form onSubmit={manejarSubmit}>
            <div className="mb-3">
              <label className="form-label fw-bold">Correo Electrónico</label>
              <input type="email" className="form-control" 
                     value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            
            <div className="mb-4">
              <label className="form-label fw-bold">Contraseña</label>
              <input type="password" className="form-control" 
                     value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            
            <button type="submit" className="btn btn-primary w-100 fw-bold">
              Ingresar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}