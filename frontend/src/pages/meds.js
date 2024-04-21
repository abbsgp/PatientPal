import React, { useState } from "react";
import "./home.css";

function Meds() {
    const [showResponse, setShowResponse] = useState(false);
    const [fontSize, setFontSize] = useState(16); // Initial font size

    const handleExplainClick = () => {
        setTimeout(() => {
            setShowResponse(!showResponse); 
        }, 2000); 
    };

    function increaseFontSize() {
        setFontSize(prevSize => prevSize + 2); // Increase font size by 2
    }

    function decreaseFontSize() {
        setFontSize(prevSize => Math.max(prevSize - 2, 10)); // Decrease font size by 2, with minimum size 10
    }

    return (
        <>
            <div className="page_head">
                <h1>Medications</h1>
            </div>
            <div className="chat-container">
                <div className="med-container">
                    <p><strong>Prescription</strong>: Losartan&nbsp;&nbsp;&nbsp;&nbsp;<strong>Capsule</strong>: 25 mg&nbsp;&nbsp;&nbsp;&nbsp;<strong>Refills</strong>: 2</p>
                    <div className="chat-ai-interpreter-container">
                        <button className="chat-ai-button" onClick={handleExplainClick}>
                            Explain
                        </button>
                    </div>
                </div>
                {showResponse && (
                    <div className="response-message" style={{ fontSize: `${fontSize}px` }}>
                        <div className="font-size-buttons">
                            <button onClick={increaseFontSize}>+</button>
                            <button onClick={decreaseFontSize}>-</button>
                        </div>
                        <p>This medication, <strong>Losartan</strong>, is commonly prescribed to help manage high blood pressure and certain heart conditions. 
                        It works by <strong>relaxing blood vessels</strong>, which helps to lower blood pressure and reduce the workload on the heart. Common 
                        side effects may include <strong>dizziness, fatigue, and changes in kidney function</strong>. It's essential to take this medication 
                        exactly as prescribed and to discuss any concerns with your healthcare provider.</p>
                    </div>
                )}
            </div>
        </>
    );
};

export default Meds;
