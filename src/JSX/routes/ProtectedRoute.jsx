
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../routes/pages/AuthProvider';

const ProtectedRoute = () => {
    const { isAuthenticated, token } = useAuth();
    return (isAuthenticated && (token !== 'null' || token !== undefined)) ? <Outlet /> : <Navigate to="/registration" replace />;
};

export default ProtectedRoute;