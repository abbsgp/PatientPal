import React, { useState } from 'react';
import axios from 'axios';
import "./home.css";

const Header = ({ onLanguageChange }) => {
  const handleLanguageChange = (e) => {
    onLanguageChange(e.target.value);
  };

  return (
    <header className="header">
      <h1>Hello, Asta!</h1>
      <select onChange={handleLanguageChange}>
        <option value="english">English</option>
        <option value="spanish">Spanish</option>
        <option value="french">French</option>
      </select>
    </header>
  );
};

const Chatbot = ({ language }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  const apiUrl = 'http://localhost:4000';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { text: input, user: true };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    setInput('');

    try {
      const chatResponse = await axios.post(apiUrl + '/start-chat', {
        language, // Pass the selected language here
        user_input: input
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
          <div key={index}>{message.text}</div>
        ))}
      </div>
    </div>
  );
};

function Home() {
  const [language, setLanguage] = useState('english');

  const handleLanguageChange = (selectedLanguage) => {
    setLanguage(selectedLanguage);
  };

  return (
    <>
      <div className="page_head"></div>
      <>
        <Header onLanguageChange={handleLanguageChange} />
        <div className="chat-container">
          <div className="chat-header">
            <h2>Chat AI</h2>
            <Chatbot language={language} />
          </div>
        </div>
      </>
    </>
  );
}

export default Home;
