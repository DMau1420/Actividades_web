export const TablaAlumno = ({ alumnos }) => {
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>N. Control</th>
          <th>Nombre</th>
          <th>Semestre</th>
          <th>Nacimiento</th>
        </tr>
      </thead>
      <tbody>
        {alumnos.map((al, i) => (
          <tr key={al.ncontrol || i}>
            <td>{al.ncontrol}</td>
            <td>{al.nombre}</td>
            <td>{al.semestre}</td>
            <td>{al.nacimiento}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};