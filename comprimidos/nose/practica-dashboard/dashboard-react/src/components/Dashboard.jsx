import { useState, useEffect, useRef } from 'react';
import { getProductos } from '../services/apiService';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// Registrar los módulos de Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Dashboard() {
  const [productos, setProductos] = useState([]);
  const [mensaje, setMensaje] = useState('');
  
  // Referencia para capturar el div y hacerlo PDF
  const dashboardRef = useRef(null);

  const barChartData = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'],
    datasets: [{ data: [65, 59, 80, 81, 56], label: 'Ventas Mensuales', backgroundColor: '#2c3e50' }]
  };

  useEffect(() => {
    getProductos().then(data => setProductos(data));
  }, []);

  const enviarMensaje = (e) => {
    e.preventDefault();
    alert('Mensaje enviado al equipo: ' + mensaje);
    setMensaje('');
  };

  // LA FUNCIÓN MAESTRA DEL PDF
  const descargarPDF = () => {
    const data = dashboardRef.current;
    if (data) {
      html2canvas(data).then(canvas => {
        const imgWidth = 208;
        const pageHeight = 295;
        const imgHeight = canvas.height * imgWidth / canvas.width;
        
        const contentDataURL = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        pdf.addImage(contentDataURL, 'PNG', 0, 0, imgWidth, imgHeight);
        pdf.save('Dashboard_Reporte.pdf');
      });
    }
  };

  return (
    <div style={{ backgroundColor: '#f4f6f9', minHeight: '100vh', paddingBottom: '3rem' }}>
      
      {/* NAVBAR */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">
        <div className="container-fluid">
          <a className="navbar-brand fw-bold" href="#"><i className="fa-solid fa-chart-line me-2"></i>AdminPanel</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#menuPrincipal">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="menuPrincipal">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item"><a className="nav-link" href="#"><i className="fa-solid fa-house me-1"></i> Inicio</a></li>
              <li className="nav-item"><a className="nav-link" href="#"><i className="fa-solid fa-users me-1"></i> Usuarios</a></li>
              <li className="nav-item">
                <button className="btn btn-danger ms-2 fw-bold" onClick={descargarPDF}>
                  <i className="fa-solid fa-file-pdf me-1"></i> Exportar PDF
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* CONTENEDOR DEL DASHBOARD (Para el PDF) */}
      <div className="container-fluid mt-4" ref={dashboardRef}>
        <h2 className="mb-4 text-secondary"><i className="fa-solid fa-gauge"></i> Resumen Ejecutivo</h2>

        {/* TARJETAS */}
        <div className="row mb-4">
          <div className="col-md-4">
            <div className="card text-white bg-primary shadow-sm h-100">
              <div className="card-body">
                <h5 className="card-title"><i className="fa-solid fa-box-open"></i> Productos Totales</h5>
                <h2 className="display-4 fw-bold">1,204</h2>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card text-white bg-success shadow-sm h-100">
              <div className="card-body">
                <h5 className="card-title"><i className="fa-solid fa-sack-dollar"></i> Ingresos del Mes</h5>
                <h2 className="display-4 fw-bold">$45,000</h2>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card text-white bg-warning shadow-sm h-100">
              <div className="card-body">
                <h5 className="card-title"><i className="fa-solid fa-users"></i> Nuevos Clientes</h5>
                <h2 className="display-4 fw-bold">342</h2>
              </div>
            </div>
          </div>
        </div>

        {/* GRÁFICA Y CARRUSEL */}
        <div className="row mb-4">
          <div className="col-md-8">
            <div className="card shadow-sm h-100">
              <div className="card-header bg-white fw-bold"><i className="fa-solid fa-chart-column text-primary"></i> Rendimiento</div>
              <div className="card-body d-flex justify-content-center">
                <div style={{ height: '300px', width: '100%' }}>
                  <Bar data={barChartData} options={{ maintainAspectRatio: false }} />
                </div>
              </div>
            </div>
          </div>
          
          <div className="col-md-4">
            <div className="card shadow-sm h-100">
              <div className="card-header bg-white fw-bold"><i className="fa-solid fa-star text-warning"></i> Destacados</div>
              <div className="card-body p-0">
                <div id="carruselProductos" className="carousel slide" data-bs-ride="carousel">
                  <div className="carousel-inner">
                    {productos.map((prod, index) => (
                      <div key={prod.id} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                        <img src={prod.images[0]} className="d-block w-100" style={{ height: '300px', objectFit: 'cover' }} alt="prod" />
                        <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded">
                          <h5>{prod.title}</h5>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="carousel-control-prev" type="button" data-bs-target="#carruselProductos" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon"></span>
                  </button>
                  <button className="carousel-control-next" type="button" data-bs-target="#carruselProductos" data-bs-slide="next">
                    <span className="carousel-control-next-icon"></span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* TABLA Y FORMULARIO */}
        <div className="row">
          <div className="col-md-8">
            <div className="card shadow-sm">
              <div className="card-header bg-white fw-bold"><i className="fa-solid fa-list text-success"></i> Últimos Ingresos</div>
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-hover table-striped mb-0">
                    <thead className="table-dark">
                      <tr><th>ID</th><th>Producto</th><th>Categoría</th><th>Precio</th></tr>
                    </thead>
                    <tbody>
                      {productos.map(prod => (
                        <tr key={prod.id}>
                          <td>{prod.id}</td>
                          <td>{prod.title}</td>
                          <td><span className="badge bg-info">{prod.category.name}</span></td>
                          <td className="fw-bold">${prod.price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-4 mt-4 mt-md-0">
            <div className="card shadow-sm border-info">
              <div className="card-header bg-info text-white fw-bold"><i className="fa-solid fa-paper-plane"></i> Nota al Equipo</div>
              <div className="card-body">
                <form onSubmit={enviarMensaje}>
                  <div className="mb-3">
                    <label className="form-label fw-bold">Mensaje</label>
                    <textarea className="form-control" rows="4" value={mensaje} onChange={(e) => setMensaje(e.target.value)}></textarea>
                  </div>
                  <button type="submit" className="btn btn-info text-white w-100 fw-bold">Enviar Aviso</button>
                </form>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}