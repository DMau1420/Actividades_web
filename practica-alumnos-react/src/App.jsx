import { useState } from 'react';
import { TablaAlumno } from './components/TablaAlumno';
import { ModalAlumno } from './components/ModalAlumno';

function App() {
  const [lista, setLista] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);

  const agregarAlumno = (nuevoAlumno) => {
    setLista([...lista, nuevoAlumno]);
    setMostrarModal(false);
  };

  return (
    <div className="container mt-5">
      <h2>Control de Alumnos - React</h2>
      <button 
        className="btn btn-primary mb-3" 
        onClick={() => setMostrarModal(true)}
      >
        Nuevo Registro
      </button>

      <TablaAlumno alumnos={lista} />

      {mostrarModal && (
        <ModalAlumno 
          onAceptar={agregarAlumno} 
          onCancelar={() => setMostrarModal(false)} 
        />
      )}
    </div>
  );
}

export default App;