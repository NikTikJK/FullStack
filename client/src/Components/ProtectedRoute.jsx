import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
    const userData = localStorage.getItem('user');
    const isAuthenticated = userData && userData !== 'null' && userData !== '{}';

  return isAuthenticated ? <Outlet /> : <Navigate to="/auth" replace />;
};

export default ProtectedRoute;