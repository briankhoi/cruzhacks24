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
       <img alt="" class="logo" src="https://d3cy9zhslanhfa.cloudfront.net/media/3800C044-6298-4575-A05D5C6B7623EE37/4B45D0EC-3482-4759-82DA37D8EA07D229/webimage-8A27671A-8A53-45DC-89D7BF8537F15A0D.png"></img>
       </NavLink>
     </nav>
      <Dropdown
        label={<div rounded className="avatar" style={{backgroundImage: `url('${user ? user.picture : "https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg"}')`}}/>}
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