import { Navigate, Outlet } from 'react-router-dom';
import { isLoggedIn } from '../services/authService';

export default function PrivateRoute() {
  // Si está logueado, renderiza el componente hijo (<Outlet />)
  // Si no, lo redirecciona al login
  return isLoggedIn() ? <Outlet /> : <Navigate to="/login" replace />;
}