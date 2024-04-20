import React  from "react";
import Header from '../components/header';
import "./home.css"

function Home() {
    
    return (

        <><Header /><div className="chat-container">
              <div className="chat-header">
                  <h2>Chat AI</h2>
              </div>
              <div className="chat-mes sages">
                  {/* Display chat messages */}
              </div>
              <div className="chat-input">
                  <input type="text" placeholder="Type your message..." />
                  <button>Send</button>
              </div>
          </div></>
      );

};

export default Home;