import { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext(false);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [loggedInUser, setLoggedInUser] = useState(localStorage.getItem("user"));
    const [loading, setLoading] = useState(true); // ✅ add this

    useEffect(() => {
        const validateToken = async () => {
            const token = localStorage.getItem("token");
            const user = localStorage.getItem("user");
            // console.log("Validating Existing token:", token);


            if (!token) {
                setIsAuthenticated(false);
                setLoading(false); // ✅ stop loading
                setToken("null")
                setLoggedInUser("null");
                return;
            }

            try {
                const res = await fetch("http://localhost:8080/validate-token", {
                    headers: {
                        // Authorization: `Bearer ${token}`,
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });

                if (res.ok) {
                    const result = await res.json();
                    setIsAuthenticated(result.valid);
                    //setLoggedInUser(user);
                    setToken(token)
                } else {
                    setIsAuthenticated(false);
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
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
        //return <div>Loading...</div>;
        return <div></div>;
    }

    console.log("Final Auth (state): ", isAuthenticated);
    console.log("Final Token (value): ", token);
    console.log("LoggedIn User: ", loggedInUser);

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, token, setToken, loggedInUser, setLoggedInUser }}>
            {/* <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, token, setToken }}> */}
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);