import React, { useState } from "react";
import "./home.css";

function Meds() {
    const [showResponse, setShowResponse] = useState(false);

    const handleExplainClick = () => {
        setTimeout(() => {
            setShowResponse(!showResponse); 
        }, 2000); 
    };

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
                    <div className="response-message">
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
