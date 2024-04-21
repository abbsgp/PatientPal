import  React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./home.css";

const Header = () => {
    return (
        <header className="header">
            <h1>Hello, Asta!</h1>
        </header>
    );
};



const Chatbot = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [language, setLanguage] = useState('english');

  const apiUrl = 'http://localhost:4000';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
  
    const userMessage = { text: input, user: true };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    setInput('');
  
    try {
        const chatResponse = await axios.post(apiUrl + '/start-chat', {
          "language": language,
          "user_input": input
        }).then((res) => {
            const aiMessage = { text: res.data.modelResponse, user: false };
            setMessages((prevMessages) => [...prevMessages, aiMessage]);
        }).catch((err) => {
            console.log(err)
        });      
  
      } catch (error) {
        console.error('Error communicating with the backend:', error.message);
      }
  
  };


  return (
    <div className="chatbot-container">
      <form className="chatbot-input-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button type="submit">Send</button>
      </form>
      <div className="chatbot-messages">
        {messages.map((message, index) => (
          <div
            key={index}
          >
            {message.text}
          </div>
        ))}
      </div>
    </div>
  );
};




function Home() {
    
    return (

        <><div className="page_head"></div>
        <><Header /><div className="chat-container">
            <div className="chat-header">
                <h2>Chat AI</h2>
                <Chatbot />
            </div>
            {/* <div className="chat-messages">
            </div>
            <div className="chat-input">
                <input type="text" placeholder="Type your message..." />
                <button>Send</button>
            </div> */}
        </div></></>
      );

};

export default Home;