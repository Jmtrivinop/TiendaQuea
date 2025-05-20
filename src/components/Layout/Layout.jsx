import { useContext } from 'react';

import Navbar from '../navbar/Navbar';
import { Outlet } from 'react-router-dom';
import './Layout.css';

function Layout({logOut}) {


  return (
    <div className={`layout`}>
      <Navbar logOut={logOut} />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
