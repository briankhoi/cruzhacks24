// flashcards.js
import React, { useState, useRef, useEffect } from 'react';
import "./flashcards.scss";

const Flashcards = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
      fetch("http://localhost:5000/api/user", {
          credentials: "include", // include cookies
      })
          .then((response) => {
              if (!response.ok) {
                  throw new Error("Network response was not ok");
              }
              return response.json();
          })
          .then((data) => {
            console.log(data);
              if (data.isAuthenticated) {
                  setUser(data.user);
                  console.log(data.user.flashcards); // Access the flashcards field
              }
          })
          .catch((error) => {
              console.error("fetch operation error:", error);
          });
  }, []);
  // Hardcoded flashcard data
  const flashcardsData = [
    {
      title: 'Programming 101 Flashcards',
      cards: [
        ['Programming Language', 'A method to exchange information between humans and computers'],
        ['Machine Code', 'Is written in machine language. It has 32- or 64-bit instructions for the machine processor. It contains no comments of indentations'],
        ['High-Level Programming Language', 'Python'],
        ['Interpreter', 'A program that runs a shell terminal and converts the source code into a machine language by one statement at a time. An interpreter helps in debugging code.'],
        ['Compiler', 'A program that transforms the source code written in a high-level language into a machine language'],
        ['Debugger', 'A program that helps find and fix errors in the source code']
      ]
    },
    {
      title: 'Lecture Notes Flashcards',
      cards: [
        ['What is a String?', 'Strings in python belong to simple or primitive data types. Strings can be considered to be a data collection.'],
        ['String Methods vs String Functions', 'String functions take strings as an argument and use the syntax function(string). String methods use the syntax string.methodname().'],
        ['Example of String Method', 'string.join()'],
        ['Example of String Function', 'print(string)'],
        ['What is a Regular Expression?', 'A regular expression is used to search strings for string patterns and operate on them.'],
        ['Example of Regular Expression Pattern', '\\b'],
        ['Confusing Parts of the Lecture', 'String methods and regular expressions'],
        ['Typos, Errors, or Inconsistencies', 'None'],
        ['Liked Lecture Points', 'Covered confusing topics like string methods and regular expressions']
      ]
    }
  ];

  // const [isMainPopupOpen, setIsMainPopupOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [isGroupPopupOpen, setIsGroupPopupOpen] = useState(false);
  const [isSlideshowOpen, setIsSlideshowOpen] = useState(false);
  const [selectedFlashcardIndex, setSelectedFlashcardIndex] = useState(0);
  const [showFront, setShowFront] = useState(true);

  const slideshowRef = useRef(null);

  const handleGroupSelect = (index) => {
    setSelectedGroup(index);
    setIsGroupPopupOpen(true);
    setIsSlideshowOpen(true);
  };

  const handleCloseGroupPopup = () => {
    setSelectedGroup(null);
    setIsGroupPopupOpen(false);
    setIsSlideshowOpen(false);
  };

  const handleSlideshowClick = (event) => {
    // Prevent closing the slideshow when clicking inside it
    if (slideshowRef.current && slideshowRef.current.contains(event.target)) {
      return;
    }
    setIsGroupPopupOpen(false);
    setIsSlideshowOpen(false);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleSlideshowClick);
    return () => {
      document.removeEventListener('mousedown', handleSlideshowClick);
    };
  }, [isGroupPopupOpen, isSlideshowOpen]);

  const handleFlashcardClick = () => {
    // Toggle between front and back of the flashcard when clicked
    setShowFront((prevShowFront) => !prevShowFront);
  };

  const handleNextFlashcard = () => {
    // Move to the next flashcard and show its front
    setSelectedFlashcardIndex((prevIndex) => (prevIndex + 1) % flashcardsData[selectedGroup].cards.length);
    setShowFront(true);
  };

  const handlePrevFlashcard = () => {
    // Move to the previous flashcard and show its front
    setSelectedFlashcardIndex((prevIndex) => (prevIndex - 1 + flashcardsData[selectedGroup].cards.length) % flashcardsData[selectedGroup].cards.length);
    setShowFront(true);
  };

  return (
    <div class="flashcards">
        <div>
          {/* Icons of flashcard groups */}
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {flashcardsData.map((group, index) => (
              <div
                key={index}
                style={{
                  width: 'calc(33.333% - 20px)',
                  height: '100px',
                  backgroundColor: '#71906e',
                  paddingLeft: '10px',
                  borderRadius: '10px',
                  margin: '10px',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  color: 'white',
                  fontSize: '1.2em',
                }}
                onClick={() => handleGroupSelect(index)}
              >
                {group.title}
              </div>
            ))}
          </div>
        </div>

      {/* Popup with slideshow of flashcards for selected group */}
      {isGroupPopupOpen && selectedGroup !== null && (
        <div ref={slideshowRef} style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '80%', backgroundColor: 'rgba(255, 255, 255, 0.95)', zIndex: '1000', overflow: 'auto', borderRadius: '10px', padding: '20px' }}>
          <h2>{flashcardsData[selectedGroup].title}</h2>
          {/* Slideshow of flashcards */}
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <div style={{ flex: 1, cursor: 'pointer' }} onClick={handlePrevFlashcard}>&lt;</div>
            <div style={{ flex: 8, border: '1px solid #ddd', borderRadius: '8px', padding: '10px', margin: '10px', minHeight: '200px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }} onClick={handleFlashcardClick}>
              {showFront
                ? <p style={{ margin: '0', cursor: 'pointer' }}>{flashcardsData[selectedGroup].cards[selectedFlashcardIndex][0]}</p> // Show front of the flashcard (definition)
                : <p style={{ margin: '0', cursor: 'pointer' }}>{flashcardsData[selectedGroup].cards[selectedFlashcardIndex][1]}</p> // Show back of the flashcard (term)
              }
            </div>
            <div style={{ flex: 1, cursor: 'pointer' }} onClick={handleNextFlashcard}>&gt;</div>
          </div>
          {/* Close button */}
          <div style={{ position: 'absolute', top: '10px', right: '10px', cursor: 'pointer', color: 'black' }} onClick={handleCloseGroupPopup}>X</div>
        </div>
      )}
    </div>
  );
};

export default Flashcards;