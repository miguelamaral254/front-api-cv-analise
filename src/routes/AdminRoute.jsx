
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';

const AdminRoute = () => {
  const { user } = useAuth();

  if (user && user.role !== 'admin') {
    return <Navigate to="/vagas" replace />;
  }

  return <Outlet />;
};

export default AdminRoute;