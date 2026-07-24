import { NavLink, Link, Outlet } from "react-router-dom";
import logo from '../../../assets/brandlogo.png';
import { useAuth } from "../pages/AuthProvider";
import { LogOut } from "lucide-react";

const RootLayout = () => {

  const { isAuthenticated, setIsAuthenticated } = useAuth();

  const logout = () => {
    localStorage.setItem('userAuthenticated', false);
    setIsAuthenticated(false);
    localStorage.removeItem('userAuthenticated');
  }

  return (
    <>
      <header>
        <div className="custom-logo">
          <span><Link to="/"><img src={logo} style={{ width: 85 }} /></Link></span>
        </div>

        {isAuthenticated &&
          <nav>
            {/* <li><Link to="/"> Home </Link></li>
            <li><Link to='/about'> About </Link></li>
            <li><Link to="/contact"> Contact</Link></li> */}
            <li><NavLink to="/"> Home </NavLink></li>
            <li><NavLink to='/about' className="logo-green"> About Us </NavLink></li>
            <li><NavLink to="/products"> Products</NavLink></li>
            <li><NavLink to="/todos" className="logo-green"> Todos </NavLink></li>
            <li><NavLink to="/userdetails"> UserDetails </NavLink></li>
            <li><NavLink to="/contact" className="logo-green"> Contact</NavLink></li>
            {/* <li><NavLink to="/registration" onClick={logout} className="logout"> <span className="sr-only">LogOut</span> </NavLink></li> */}
            <li><NavLink to="/registration" onClick={logout} title="Logout"> <LogOut className="logout-icon" size={30} /></NavLink></li>
          </nav>
        }
      </header>
      <Outlet />
    </>
  )
}

export default RootLayout