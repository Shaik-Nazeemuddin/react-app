import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../routes/pages/AuthProvider";

const PublicRoutes = () => {
    const { setIsAuthenticated, setToken, setLoggedInUser } = useAuth();

    useEffect(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setIsAuthenticated(false);
        setToken('null');
        setLoggedInUser('null')
    }, []);

    return <Outlet />;
};

export default PublicRoutes;