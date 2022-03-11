import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import logo from '../../Images/Logo.png';

const Header = () => {
   return (
      <>
         <nav sticky="top">
            <div className='d-flex align-items-center justify-content-between p-3'>
               <div>
                  <Link to="/">
                     <img src={logo} style={{ width: '80px', cursor: 'pointer' }} alt="" />
                  </Link>
               </div>
               <div className='d-flex text-decoration-none'>
                  <div>
                     <Link className="navHover text-decoration-none text-dark p-2" to="/home">HOME</Link>
                  </div>
                  <div className='mx-5'>
                     <Link className="navHover text-decoration-none text-dark p-2" to="/order">ORDER</Link>
                  </div>
                  <div>
                     <Link className="navHover text-decoration-none text-dark p-2" to="/admin">ADMIN</Link>
                  </div>
                  <div className='mx-5'>
                     <Link className="navHover text-decoration-none text-dark p-2" to="/about">ABOUT</Link>
                  </div>
                  <div>
                     <Link className="navHover text-decoration-none text-dark p-2" to="/contact">CONTACT</Link>
                  </div>
               </div>

               <div className='d-flex gap-4'>
                  <div>
                     <button className='button'>
                        <Link className='button-style text-decoration-none text-dark' to="/login">Login</Link>
                     </button>
                  </div>
                  <div>
                     <button className='button'>
                        <Link className='button-style text-decoration-none text-dark' to="/signup">SignUp</Link>
                     </button>
                  </div>
               </div>
            </div>
         </nav>
      </>
   );
};

export default Header;
