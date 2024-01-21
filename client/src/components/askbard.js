// AskBardChatBox.js
import React, { useState, useEffect, useRef } from 'react';
import config from '../config';
import { GoogleGenerativeAI } from "@google/generative-ai";
import './askbard.css';

const apiKey = config.API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const AskBardChatBox = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [hover, setHover] = useState(false);

  const chatBoxRef = useRef(null);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const sendMessage = async () => {
    if (newMessage.trim() !== '') {
      setMessages([...messages, { text: newMessage, sender: 'user' }]);
      try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const result = await model.generateContent(newMessage);
        const response = await result.response;
        const text = response.text();
        setMessages([...messages, { text, sender: 'bard' }]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setNewMessage('');
    }
  };

  const handleClickOutside = (event) => {
    if (chatBoxRef.current && !chatBoxRef.current.contains(event.target)) {
      setIsChatOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 999 }}>
      <div className="bard-icon"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={toggleChat}
      >
        <span style={{ color: 'white'}}><img src="bard.png" width="60"></img></span>
        {hover && (
          <div className='bard-banner'>
            Ask Bard
          </div>
        )}
      </div>
      {isChatOpen && (
        <div
          ref={chatBoxRef}
          style={{
            position: 'fixed',
            bottom: '70px',
            right: '20px',
            width: '40%',
            height: '50%',
            backgroundColor: 'white',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
            borderRadius: '10px',
            overflow: 'hidden',
            zIndex: 999,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div
            style={{
              borderBottom: '1px solid #ddd',
              padding: '10px',
              textAlign: 'center',
              fontSize: '18px',
              fontWeight: 'bold',
              backgroundColor: '#71906e',
              color: 'white',
              borderTopLeftRadius: '10px',
              borderTopRightRadius: '10px',
            }}
          >
            Ask Bard
          </div>
          <div
            style={{
              height: 'calc(100% - 80px)',
              overflowY: 'auto',
              padding: '10px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {messages.map((message, index) => (
              <div
                key={index}
                style={{
                  marginBottom: '10px',
                  textAlign: message.sender === 'bard' ? 'left' : 'right',
                }}
              >
                <div
                  style={{
                    display: 'inline-block',
                    backgroundColor: message.sender === 'bard' ? '#8a00e6' : '#f0f0f0',
                    color: message.sender === 'bard' ? 'white' : '#333',
                    borderRadius: '8px',
                    padding: '8px',
                    maxWidth: '80%',
                  }}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>
          <div
            style={{
              borderTop: '1px solid #ddd',
              padding: '10px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message...">
            </input>
            <div className="bard-button" onClick={sendMessage}>
              Send
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AskBardChatBox;
