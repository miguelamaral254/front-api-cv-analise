
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const AdminRoute = () => {
  const { user } = useAuth();

  if (user && user.role !== 'admin') {
    return <Navigate to="/vagas" replace />;
  }

  return <Outlet />;
};

export default AdminRoute;