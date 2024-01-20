import { React } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { NavLink } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
 // Here, we display our Navbar
export default function Navbar() {
 return (
   <div style={{border: "1px solid blue"}}>
    <Container>
    <Row>
     <nav className="navbar navbar-light">
       <NavLink className="navbar-brand" to="/">
       <img alt="" style={{"width" : 25 + '%'}} src="https://d3cy9zhslanhfa.cloudfront.net/media/3800C044-6298-4575-A05D5C6B7623EE37/4B45D0EC-3482-4759-82DA37D8EA07D229/webimage-8A27671A-8A53-45DC-89D7BF8537F15A0D.png"></img>
       </NavLink>
     </nav>
     <div style={{
        border: "1px solid red",
        width: "50px",
        height: "50px",
        backgroundImage: `url("https://cdn.iconscout.com/icon/free/png-256/free-google-1772223-1507807.png")`,
        backgroundPosition: 'center', // this will center the image
        backgroundSize: 'cover', // this will cover the entire div and crop the rest
        backgroundRepeat: 'no-repeat', // this will prevent the image from repeating
        borderRadius: '50%' // this will make the div circular
      }} />
     </Row>
     </Container>
   </div>
 );
}