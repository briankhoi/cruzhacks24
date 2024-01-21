import { React } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { NavLink } from "react-router-dom";
import './navbar.scss';
import { Dropdown } from 'flowbite-react';
import './navbar.css';

export default function Navbar({user, onLogout}) {
 return (
   <div class="navbar">
     <nav className="navbar navbar-light">
       <NavLink className="navbar-brand" to="/">
       <img alt="logo" className="logo" src="/icon_transparent.png"></img>
       </NavLink>
     </nav>
      <Dropdown
        label={<div className="avatar" style={{backgroundImage: `url('${user ? user.picture : "https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg"}')`}}/>}
        arrowIcon={false}
        // inline
        class="test"
      >

        <Dropdown.Header>
          {user === null ? (
            <div className="auth" onClick={() => window.location.href='http://localhost:5000/login'}>
              <div>Log In</div>
            </div>
          ) : (
            <div class="auth" onClick={onLogout}>Log Out</div>
          )}
        </Dropdown.Header>
      </Dropdown>
    </div>
 );
}