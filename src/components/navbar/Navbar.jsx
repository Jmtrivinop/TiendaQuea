import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import "./Navbar.css";

export const Navbar = ({ carrito }) => {
  const [currentUser, setCurrentUser] = useState(
    localStorage.getItem("currentUser")
  );
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    navigate("/login");
    setShowDropdown(false);
  };

  const goToCart = () => {
    navigate("/cart");
  };

  const goToHome = () => {
    navigate("/");
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
      <h1>Tienda 3D</h1>
      <Link to="/carrito">
    
          <button className="btn-carrito">Ver Carrito</button>
      </Link>
      <div className="navbar-brand">
        <h1 onClick={goToHome} style={{ cursor: "pointer" }}>
          Tienda 3D
        </h1>
      </div>
      <div className="navbar-actions">
        <div className="cart-icon-container" onClick={goToCart}>
          <span className="cart-icon">🛒</span>
          {carrito.length > 0 && (
            <span className="cart-badge">{carrito.length}</span>
          )}
        </div>

        {currentUser ? (
          <div className="user-dropdown">
            <button
              className={`user-button ${showDropdown ? "active" : ""}`}
              onClick={() => setShowDropdown(!showDropdown)}
            >
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
          <a href="/login" className="login-button">
            Iniciar Sesión
          </a>
        )}
      </div>
    </header>
  );
};

export default Navbar;
