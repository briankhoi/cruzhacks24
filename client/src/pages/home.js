import Navbar from "../components/navbar";
import ToDo from "../components/todo";
import './home.css';
import React, { useState, useEffect } from "react";

export default function HomePage() {
    const [user, setUser] = useState(null);

    // determine if user is authenticated or not and set state accordingly
    useEffect(() => {
    fetch('http://localhost:5000/api/user', {
        credentials: 'include', // include cookies
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.isAuthenticated) {
                setUser(data.user);
            }
        })
        .catch(error => {
            console.error('fetch operation error:', error);
        });
    }, []);

    return (
        <div class="home">
            <Navbar user={user}/>
            <h1>Home Page</h1>
            <ToDo />
        </div>

    );
}