import { Link, useLocation } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';

import './Navbar.css';


function Navbar({ logOut }) {
  const location = useLocation();
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    setUser(localStorage.getItem('user'));
    console.log(user);
  }, [user]);

 

  const toggleMenu = () => {
    setMenuVisible(!menuVisible); 
  };

  const toggleHamburgerMenu = () => {
    setHamburgerVisible(!hamburgerVisible); 
  };

  return (
    <></>

  );
}

export default Navbar;
