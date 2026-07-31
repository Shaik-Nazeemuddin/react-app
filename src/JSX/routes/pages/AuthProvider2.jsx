import { createContext, useState, useContext, useEffect } from "react";
// import { fetchWithAuth } from "../component/fetchWithAuth";

const AuthContext = createContext(false);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true); // ✅ add this

    useEffect(() => {
        const validateToken = async () => {
            const token = localStorage.getItem("token");
            console.log("Validating token:", token);

            if (!token) {
                setIsAuthenticated(false);
                setLoading(false); // ✅ stop loading
                return;
            }

            try {
                // const res = await fetch("http://localhost:3000/validate-token", {
                const res = await fetch("https://node-app-production-8f02.up.railway.app/validate-token", {
                    headers: {
                        // Authorization: `Bearer ${token}`,
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });

                if (res.ok) {
                    const result = await res.json();
                    setIsAuthenticated(result.valid);
                } else {
                    setIsAuthenticated(false);
                    localStorage.removeItem("token");
                }
            } catch (err) {
                setIsAuthenticated(false);
            }
            setLoading(false); // ✅ important
        };

        validateToken();
    }, []);

    // ✅ wait until validation completes
    if (loading) {
        return <div>Loading...</div>;
    }

    console.log("Final Auth State:", isAuthenticated);

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);