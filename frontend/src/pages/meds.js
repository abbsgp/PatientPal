import React  from "react";
import "./home.css";

function Meds() {
    return (
        <>
        <div className="page_head">
            <h1>Medications</h1>
        </div>
        <div className="chat-container">
        <div className="med-container">
        <p><strong>Prescription</strong>: Losartan&nbsp;&nbsp;&nbsp;&nbsp;<strong>Capsule</strong>: 25 mg&nbsp;&nbsp;&nbsp;&nbsp;<strong>Refills</strong>: 2</p>
            <div className="chat-ai-interpreter-container">
                <button className="chat-ai-button">
                    Explain
                </button>
            </div>
        </div>
        </div>
        </>
    );
};

export default Meds;