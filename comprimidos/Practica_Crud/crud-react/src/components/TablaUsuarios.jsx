export default function TablaUsuarios({ usuarios, seleccionados, alEditar, alEliminar, alToggleCheck, alSelectAll, alFiltrar }) {
  const estaSeleccionado = (id) => seleccionados.some(u => u.id === id);

  return (
    <div className="card shadow-sm">
      <table className="table table-hover mb-0">
        <thead className="table-dark">
          <tr>
            <th>
              <input type="checkbox" className="form-check-input"
                     checked={seleccionados.length === usuarios.length && usuarios.length > 0}
                     onChange={(e) => alSelectAll(e.target.checked)} />
            </th>
            <th>Avatar</th>
            <th>
              Nombre
              <input type="text" className="form-control form-control-sm mt-1" placeholder="Filtrar..."
                     onChange={(e) => alFiltrar('name', e.target.value)} />
            </th>
            <th>
              Correo
              <input type="text" className="form-control form-control-sm mt-1" placeholder="Filtrar..."
                     onChange={(e) => alFiltrar('email', e.target.value)} />
            </th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map(user => (
            <tr key={user.id}>
              <td>
                <input type="checkbox" className="form-check-input"
                       checked={estaSeleccionado(user.id)}
                       onChange={(e) => alToggleCheck(user, e.target.checked)} />
              </td>
              <td><img src={user.avatar} width="40" className="rounded-circle" alt="avatar" /></td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button className="btn btn-sm btn-warning me-1" onClick={() => alEditar(user)}>Editar</button>
                <button className="btn btn-sm btn-outline-danger" onClick={() => alEliminar(user.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}