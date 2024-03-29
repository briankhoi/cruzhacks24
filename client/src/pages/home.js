import Navbar from "../components/navbar";
import ToDo from "../components/todo";
import './home.scss';
import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import StudyPortal from "../components/studyportal";
import Timer from "../components/timer";
import GenerateModal from "../components/generateModal";
import NotesModal from "../components/notesmodal";
import AskBardChatBox from "../components/askbard";

export default function HomePage() {
    const [user, setUser] = useState(null);
    const [openGenerateModal, setOpenGenerateModal] = useState(false);
    const [openNoteModal, setOpenNoteModal] = useState(false);
    const { logout } = useAuth0();

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
                // console.log(user);
            }
        })
        .catch(error => {
            console.error('fetch operation error:', error);
        });
    }, []);

    //event handler for logout
    const handleLogout = () => {
        logout({ returnTo: window.location.origin });
      
        // also log out from server
        fetch('http://localhost:5000/logout', {
          credentials: 'include',
        }).then(() => {
          setUser(null); // clear user state when logging out
        });
      };

    return (
        <div class="home">
            <Navbar user={user} onLogout={handleLogout}/>
            <Timer />
            <div class="row1">
                <ToDo class="bruh23" />
                <StudyPortal class="bruh23" setOpenGenerateModal={setOpenGenerateModal} setOpenNoteModal={setOpenNoteModal} />
                <GenerateModal openGenerateModal={openGenerateModal} setOpenGenerateModal={setOpenGenerateModal} />
                <NotesModal openNoteModal={openNoteModal} setOpenNoteModal={setOpenNoteModal} />
            </div>
            <AskBardChatBox />
        </div>

    );
}