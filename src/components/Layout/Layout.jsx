import Navbar from '../navbar/Navbar';
import { Outlet } from 'react-router-dom';
import './Layout.css';

function Layout({ logOut, carrito }) {
  return (
    <div className="layout">
      <Navbar carrito={carrito} logOut={logOut} />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
