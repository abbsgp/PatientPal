import React  from "react";
import "./home.css"

const Header = () => {
    return (
        <header className="header">
            <h1>Hello, Asta!</h1>
        </header>
    );
};

function Home() {
    
    return (

        <><div className="page_head"></div>
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
        </div></></>
      );

};

export default Home;