import { useState, useEffect } from 'react';

export default function ModalUsuario({ usuario, alGuardar, alCancelar }) {
  // Estado local para los inputs del formulario
  const [formData, setFormData] = useState({ ...usuario });

  // Si el prop 'usuario' cambia (el padre manda otro para editar), actualizamos el estado local
  useEffect(() => {
    setFormData({ ...usuario });
  }, [usuario]);

  const manejarCambio = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{formData.id ? 'Editar' : 'Nuevo'} Usuario</h5>
            <button type="button" className="btn-close" onClick={alCancelar}></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label>Nombre</label>
              <input type="text" name="name" className="form-control" value={formData.name} onChange={manejarCambio} />
            </div>
            <div className="mb-3">
              <label>Email</label>
              <input type="email" name="email" className="form-control" value={formData.email} onChange={manejarCambio} />
            </div>
            {!formData.id && (
              <div className="mb-3">
                <label>Password</label>
                <input type="password" name="password" className="form-control" value={formData.password || ''} onChange={manejarCambio} />
              </div>
            )}
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={alCancelar}>Cancelar</button>
            <button className="btn btn-primary" onClick={() => alGuardar(formData)}>Guardar</button>
          </div>
        </div>
      </div>
    </div>
  );
}