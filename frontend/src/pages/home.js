import  React, { useState } from 'react';
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
  
    try {
    //   const summarizeResponse = await axios.post(apiUrl + '/summarize-document', {
    //     user_input: input,
    //     language: language,
    //   });
  
    //   const summary = summarizeResponse.data.summary;
  
      const chatResponse = await axios.post(apiUrl + '/start-chat', {
        "language": language,
        "user_input": input
      }
        )
        .then((res) => {setMessages((prevMessages) => [...prevMessages, res.data.modelResponse]);
            console.log(res.data.modelResponse);
        })
        .catch((error) => {
            console.error('Error uploading file:', error);
        });
    } catch (error) {
      console.error('Error communicating with the backend:', error.message);
    }
  
    setInput('');
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-messages">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.user ? 'user-message' : 'ai-message'}`}
          >
            {message.text}
          </div>
        ))}
      </div>
      <form className="chatbot-input-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};




function Home() {
    
    return (

        <><div className="page_head"></div>
        <><Header /><div className="chat-container">
            <div className="chat-header">
                <h2>Chat AI</h2>
            </div>
            <div className="chat-messages">
                <Chatbot />
                {/* Display chat messages */}
            </div>
            <div className="chat-input">
                <input type="text" placeholder="Type your message..." />
                <button>Send</button>
            </div>
        </div></></>
      );

};

export default Home;