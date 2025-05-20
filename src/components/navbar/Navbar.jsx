import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Navbar.css";

export const Navbar = ({ carrito, logOut }) => {
  const [currentUser, setCurrentUser] = useState(localStorage.getItem("user"));
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logOut(); // usa el prop
    setShowDropdown(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (showDropdown && !e.target.closest(".user-dropdown")) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showDropdown]);

  return (
    <header className="navbar">
      <div className="navbar-brand" onClick={() => navigate("/principal")} style={{ cursor: "pointer" }}>
        <h1>Tienda 3D</h1>
      </div>

      <div className="navbar-actions">
        <button>
          <Link to="/principal" className="nav-button">Principal</Link>
        </button>

        <div className="cart-icon-container" onClick={() => navigate("/carrito")} style={{ cursor: "pointer" }}>
          <span className="cart-icon">🛒</span>
          {carrito.length > 0 && (
            <span className="cart-badge">{carrito.reduce((sum, item) => sum + item.cantidad, 0)}</span>
          )}
        </div>

        {currentUser ? (
          <div className="user-dropdown">
            <button className={`user-button ${showDropdown ? "active" : ""}`} onClick={() => setShowDropdown(!showDropdown)}>
              {currentUser} <span className="dropdown-icon">▼</span>
            </button>
            {showDropdown && (
              <div className="dropdown-menu">
                <button className="dropdown-item" onClick={handleLogout}>
                  Cerrar sesión
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login" className="login-button">Iniciar Sesión</Link>
        )}
      </div>
    </header>
  );
};

export default Navbar;
