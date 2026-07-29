import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuth } from './AuthProvider';
import { LogIn } from "lucide-react";

const SignIn1 = () => {
    const redirect = useNavigate();
    const [error, setError] = useState(false);
    const [user, setUser] = useState({
        firstName: '',
        password: ''
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser((prev) => ({ ...prev, [name]: value }));
    }

    const handleFocus = (e) => {
        setError(false);
    }

    const handleInputFocus = (e) => {
        (e.target.value === "") ? e.target.classList.add('error') : e.target.classList.remove('error');
    }

    const handleValidateUser = async (e) => {
        e.preventDefault();

        // user validation at client side
        // try {
        //     const res = await fetch('http://localhost:3000/users');
        //     const users = await res.json();

        //     const matchedUser = users.find(
        //         currentuser => currentuser.firstName === user.firstName && currentuser.password === user.password
        //     );

        //     if (matchedUser) {
        //         redirect('/');
        //         return;
        //     }

        //     setError(true);
        //     setUser({ firstName: '', password: '' });

        // } catch (err) {
        //     console.error('Error fetching data:', err);
        //     setError(true);
        // }

        await fetch("http://localhost:3000/users/login", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        })
            .then(response => response.text())
            .then(result => {
                if (result === 'Success') {
                    redirect('/');
                    return;
                } else {
                    setError(true);
                    setUser({ firstName: '', password: '' });
                    throw new Error("Invalid User");
                }

            })
            .catch(err => {
                console.error('Error:', err.message);
            });
    };

    return (
        <div className="custom-component">
            <h2> Welcome to SignIn</h2>
            <form onSubmit={handleValidateUser} className="main" autoComplete="off" onFocus={handleFocus}>
                <h3>User SignIn</h3>
                <p className="top-info">Login if you can because we don't have a login flow yet  </p>
                {error && <span className='errormsg signup'>(New User click on signup page below)</span>}
                <label htmlFor="firstName">User Name:</label>
                <input type="text" id="firstName" name="firstName" value={user.firstName} onBlur={handleInputFocus} onChange={handleInputChange} required />

                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password"
                    pattern="^(?=.*\d)(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9])\S{8,}$" value={user.password} onBlur={handleInputFocus} onChange={handleInputChange} required />
                {error && <span className='errormsg'>Entered credentials are not valid </span>}
                <button className="btn btn-info" type="submit">
                    Login
                </button>
            </form>
            <div>
                <button className="btn btn-info" onClick={() => redirect('/registration/signup')}>SignUp Page</button>
            </div>
        </div>
    )
}

const SignIn = () => {
    const navigate = useNavigate();
    // const [error, setError] = useState("");
    const [error, setErrors] = useState({ email: false, password: false, message: "" });
    const [loading, setLoading] = useState(false);
    const { setIsAuthenticated, setToken, setLoggedInUser } = useAuth();

    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const newErrors = {
        email: !user.email?.trim(),
        password: !user.password?.trim(),
        message: ""
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser((prev) => ({ ...prev, [name]: value }));
        // setError(""); // clear error msg while typing
        setErrors((prev) => ({ ...prev, [name]: false, message: "" })); // clear specific field error
    };



    const handleValidateUser = async (e) => {
        e.preventDefault();

        if (newErrors.email || newErrors.password) {
            newErrors.message = "All fields are required";
            console.log("Validation Errors:", newErrors);
            setErrors(newErrors);
            return;
        }

        // if (!user.email || !user.password) {
        //     setError("All fields are required");
        //     return;
        // }

        try {
            setLoading(true);

            // const response = await fetch("http://localhost:3000/users/login", {
            const response = await fetch("https://node-app-production-8f02.up.railway.app/users/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(user),
            });

            if (!response.ok) {
                navigate('/registration/failure');
                throw new Error("Login Failed");
            }

            // const result = await response.text();
            const data = await response.json();

            // ✅ Store token
            localStorage.setItem("token", data.token);
            setToken(data.token);
            setIsAuthenticated(true);
            localStorage.setItem("user", data.user);
            setLoggedInUser(data.user);
            alert("Login successful ✅");
            navigate("/");

        } catch (err) {
            if (err.message === 'Failed to fetch') {
                // setError("Network Error")
                setErrors({ email: false, password: false, message: "Network Error" });
            } else {
                // setError(err.message);
                setErrors({ email: false, password: false, message: `${err.message}` });
            }
            setUser({ email: "", password: "" });
            setIsAuthenticated(false);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="custom-component">
            <h2>Welcome to SignIn</h2>
            <form
                className="main"
                onSubmit={handleValidateUser}
                autoComplete="off"
            >
                <h3>User SignIn</h3>
                <p className="top-info">
                    Login if you can because we don't have a login flow yet
                    {/* {error && <span className="errormsg">( {error} )</span>} */}
                    {error.message && <span className="errormsg">({error.message})</span>}
                </p>

                <label htmlFor="email">Email* :</label>
                <input
                    type="text"
                    id="email"
                    name="email"
                    value={user.email}
                    onChange={handleInputChange}
                    className={`${error.email ? "error" : ""}`}
                    onBlur={(e) =>
                        e.target.classList.toggle("error", e.target.value.trim() === "")
                    }
                />

                <label htmlFor="password">Password* :</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={user.password}
                    onChange={handleInputChange}
                    className={`${error.password ? "error" : ""}`}
                    onBlur={(e) =>
                        e.target.classList.toggle("error", e.target.value.trim() === "")
                    }
                    pattern="^(?=.*\d)(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9])\S{8,}$"
                    title="Minimum 8 characters with letters, numbers & special characters"
                />

                <button className="btn btn-info" type="submit" disabled={loading}>
                    {loading ? "Logging in..." : "Login "} {!loading && <LogIn className="margin-left-5" />}
                </button>
            </form>

            <div>
                <button
                    className="btn btn-info"
                    onClick={() => navigate("/registration/signup")}
                >
                    SignUp Page
                </button>
            </div>
        </div>
    );
};

export default SignIn