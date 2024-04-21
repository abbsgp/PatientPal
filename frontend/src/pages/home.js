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
      // Send user input to the summarize document endpoint
      const summarizeResponse = await axios.post(apiUrl + '/summarize-document', {
        user_input: input,
        language: language,
        file_path: apiUrl + '/output.JSON'
      });
  
      // Extract the summary from the response
      const summary = summarizeResponse.data.summary;
  
      // Send the summary to the start chat endpoint
      const chatResponse = await axios.post(apiUrl + '/start-chat', {
        user_input: summary,
        language: language
      });
  
      // Add the chatbot's response to the messages array
      const aiMessage = { text: chatResponse.data.model_response, user: false };
      setMessages((prevMessages) => [...prevMessages, aiMessage]);
    } catch (error) {
      console.error('Error communicating with the backend:', error.message);
      // Handle error if communication with backend fails
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