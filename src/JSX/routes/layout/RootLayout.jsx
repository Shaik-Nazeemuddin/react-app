import { jwtDecode } from "jwt-decode";
import { NavLink, Link, Outlet, Navigate } from "react-router-dom";
import logo from '../../../assets/brandlogo.png';
import { useAuth } from "../pages/AuthProvider";
import { LogOut, Menu, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const RootLayout = () => {

  const { isAuthenticated, setIsAuthenticated, token, setToken, loggedInUser, setLoggedInUser } = useAuth();
  // const { isAuthenticated, setIsAuthenticated, token, setToken } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [hasExpired, setHasExpired] = useState(false);
  const timerRef = useRef(null); // keep track of popup timer
  const autoCloseRef = useRef(null);

  // 🔑 Schedule popup before expiry
  const schedulePopup = (token) => {
    if (!token) return;
    const decoded = jwtDecode(token);
    if (decoded.exp) {
      const expiryTime = decoded.exp * 1000;
      const now = Date.now();
      const timeUntilPopup = expiryTime - now - 5 * 60 * 1000; // 5 min before expiry

      if (timerRef.current) clearTimeout(timerRef.current);

      if (timeUntilPopup <= 0) {
        openPopup();
      } else {
        timerRef.current = setTimeout(() => {
          openPopup();
        }, timeUntilPopup);
      }
    }
  };

  const openPopup = () => {
    setHasExpired(true);
    // Auto-close session if no response in 50 seconds
    autoCloseRef.current = setTimeout(() => {
      logout();
    }, 2 * 60 * 1000);
  };

  const handleExtend = async () => {
    try {
      //const res = await fetch("http://localhost:3000/refresh-token", {
      const res = await fetch("https://node-app-production-8f02.up.railway.app/refresh-token", {
        method: "POST",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const data = await res.json();
      if (data.token) {
        localStorage.setItem("token", data.token);
        // setToken(data.token);
        setHasExpired(false); // close popup
        clearTimeout(autoCloseRef.current); // cancel auto logout
        schedulePopup(data.token); // ✅ reset timer with new token
      }
    } catch (err) {
      logout();
    }
  };

  const validateToken = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("No token found → invalid");
      setToken("null");  //added
      setLoggedInUser("null");
      return false;
    }

    try {
      // const res = await fetch("http://localhost:3000/validate-token", {
      const res = await fetch("https://node-app-production-8f02.up.railway.app/validate-token", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        return false;
      }

      const data = await res.json();
      return data.valid === true;
    } catch (err) {
      console.error("Error during token validation:", err.message);
      return false;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    if (token) {
      localStorage.removeItem("token");
      setToken("null");
      setLoggedInUser("null");
      setHasExpired(false); // hide popup
    }
  }

  const handleCloseMenu = async () => {
    const isValid = await validateToken();
    if (!isValid) { logout(); }
    setTimeout(() => { setIsOpen(false) }, 10);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) schedulePopup(token);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [token]);

  return (
    <>
      <header className={isAuthenticated && token ? "" : "header-logo-center"}>
        <div className="custom-logo">
          <span><Link to="/"><img src={logo} style={{ width: 85 }} title="Logo" /></Link></span>
        </div>

        {/* Hamburger Button */}
        {isAuthenticated && token && (
          <button
            className="menu-toggle"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        )}

        {/* Navigation */}
        {isAuthenticated && token ? (
          <nav className={`nav ${isOpen ? "open" : ""}`}>
            <li><NavLink to="/" onClick={handleCloseMenu}> Home </NavLink></li>
            <li><NavLink to='/about' className="logo-green" onClick={handleCloseMenu}> About Us </NavLink></li>
            <li><NavLink to="/products" onClick={handleCloseMenu}> Products</NavLink></li>
            <li><NavLink to="/todos" className="logo-green" onClick={handleCloseMenu}> Todos </NavLink></li>
            <li><NavLink to="/userdetails" onClick={handleCloseMenu}> UserDetails </NavLink></li>
            <li><NavLink to="/contact" className="logo-green" onClick={handleCloseMenu}> Contact</NavLink></li>
            <li><NavLink to="/registration" onClick={() => { setIsOpen(false); logout(); }} title="Logout"> <LogOut className="logout-icon" size={30} /></NavLink></li>
          </nav>
        ) : (
          <Navigate to="/registration" replace />
        )}
      </header>

      {isAuthenticated && token && loggedInUser && (
        <div className="loggeduser">
          [ Welcome - {loggedInUser} ]
        </div>
      )}

      {hasExpired && (
        <div className="modal">
          <div className="modal-content">
            <h2>Session Expired</h2>
            <p>Do you want to extend your session?</p>
            <button onClick={handleExtend}>Yes</button>
            <button onClick={logout}>No</button>
          </div>
        </div>
      )}
      < Outlet />
      {isAuthenticated && (
        <footer className="footer">
          <div style={{
            marginTop: '32px', padding: '10px 0', color: '#040404', textAlign: 'left'
          }}>© 2026, All rights reserved</div>
        </footer>
      )}
    </>
  )
}



export default RootLayout