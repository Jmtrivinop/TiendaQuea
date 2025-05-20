import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login/Login';
import Layout from './components/Layout/Layout';
import './App.css';
import PagPrincipal from './components/Principal/PagPrincipal'; 
import { Carrito } from './components/carrito/Carrito';
import { useEffect, useState } from 'react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setIsLoggedIn(true);
    }
    setIsLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
  };

  const handleLogin = (userName) => {
    localStorage.setItem('user', userName);
    setIsLoggedIn(true);
  };

  if (isLoading) return null;

  return (
    <BrowserRouter>
      <Routes>
        {!isLoggedIn ? (
          <Route path="/" element={<Login onLogin={handleLogin} />} />
        ) : (
          <Route
            path="/"
            element={
              <Layout
                logOut={handleLogout}
                carrito={carrito}
              />
            }
          >
            <Route index element={<Navigate to="/principal" replace />} />
            <Route path="principal" element={<PagPrincipal carrito={carrito} setCarrito={setCarrito} />} />
            <Route path="carrito" element={<Carrito carrito={carrito} setCarrito={setCarrito} />} />
          </Route>
        )}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
