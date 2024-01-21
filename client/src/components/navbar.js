import { React } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { NavLink } from "react-router-dom";
import './navbar.scss';

export default function Navbar({user}) {
  console.log("user");
  console.log(user);
 return (
   <div class="navbar">
     <nav className="navbar navbar-light">
       <NavLink className="navbar-brand" to="/">
       <img alt="" class="logo" src="https://d3cy9zhslanhfa.cloudfront.net/media/3800C044-6298-4575-A05D5C6B7623EE37/4B45D0EC-3482-4759-82DA37D8EA07D229/webimage-8A27671A-8A53-45DC-89D7BF8537F15A0D.png"></img>
       </NavLink>
     </nav>
     <div className="avatar" style={{backgroundImage: `url('${user ? user.picture : "https://avatars.githubusercontent.com/u/20049127?s=200&v=4"}')`}}></div>
   </div>
 );
}