import { useState } from 'react';

export const ModalAlumno = ({ onAceptar, onCancelar }) => {
  const [form, setForm] = useState({ ncontrol: '', nombre: '', semestre: 1, nacimiento: '' });

  const manejarCambio = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const enviar = () => {
    if (form.ncontrol && form.nombre) {
      onAceptar(form);
    }
  };

  return (
    <div className="modal d-block" style={{ background: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header"><h5>Nuevo Alumno</h5></div>
          <div className="modal-body">
            <input name="ncontrol" value={form.ncontrol} onChange={manejarCambio} className="form-control mb-2" placeholder="No. Control" />
            <input name="nombre" value={form.nombre} onChange={manejarCambio} className="form-control mb-2" placeholder="Nombre completo" />
            <input name="semestre" type="number" value={form.semestre} onChange={manejarCambio} className="form-control mb-2" />
            <input name="nacimiento" type="date" value={form.nacimiento} onChange={manejarCambio} className="form-control mb-2" />
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onCancelar}>Cancelar</button>
            <button className="btn btn-success" onClick={enviar}>Aceptar</button>
          </div>
        </div>
      </div>
    </div>
  );
};