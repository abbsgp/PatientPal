import React, { useState } from "react";
import axios from 'axios';
import "./home.css";

const apiUrl = 'http://localhost:4000';

function UploadPdf() {
    const [pdf, setPdf] = useState('');
    const [pageLimit, setPageLimit] = useState(2);
    const [responseMessage, setResponseMessage] = useState('');
    const [fontSize, setFontSize] = useState(16); // Initial font size

    function handlePdf(e) {
        setPdf(e.target.files[0]);
    }

    function handleApi() {
        const formData = new FormData();
        formData.append('file', pdf);
        axios.post(apiUrl + '/extract-medical-data?page_limit=' + pageLimit, formData)
            .then((res) => {
                setResponseMessage('Response received: ' + res.data); // Update response message
            })
            .catch((error) => {
                console.error('Error uploading file:', error);
                setResponseMessage('Error occurred while uploading file.'); // Update response message in case of error
            });
    }

    function increaseFontSize() {
        setFontSize(prevSize => prevSize + 2); // Increase font size by 2
    }

    function decreaseFontSize() {
        setFontSize(prevSize => Math.max(prevSize - 2, 10)); // Decrease font size by 2, with minimum size 10
    }

    return (
        <div>
            <input type="file" name="file" onChange={handlePdf} />
            <div className="lab-submit-container">
                <div className="lab-submit-button">
                    <button onClick={handleApi}>Submit</button>
                </div>
            </div>
            {responseMessage && (
                <>                
                <div className="response-message" style={{ fontSize: `${fontSize}px` }}>
                <div className="font-size-buttons">
                    <button onClick={increaseFontSize}>+</button>
                    <button onClick={decreaseFontSize}>-</button>
                </div>
                    <p>
                        Your recent blood report, called a Complete Blood Count (CBC), indicates several important findings:
                    </p>
                    <p>
                        1. <strong>Anemia</strong>: Your hemoglobin level is low, which may explain feelings of fatigue and weakness. This condition requires attention to improve your energy levels and overall health.
                    </p>
                    <p>
                        2. <strong>Red Blood Cell Characteristics</strong>: Abnormalities in red blood cell size and concentration suggest potential deficiencies in iron or certain vitamins. These can contribute to your anemia and require further investigation.
                    </p>
                    <p>
                        3. <strong>Platelet Count</strong>: Your platelet count is lower than expected, increasing your risk of bruising and bleeding. Monitoring and discussing this with your healthcare provider is important.
                    </p>
                    <p>
                        These findings highlight potential health issues that need further evaluation and management. It's essential to schedule a follow-up appointment with your healthcare provider to discuss these results in detail and determine the best course of action for your health.
                    </p>
                </div>
                </>
            )}
        </div>
    );
}

function Labs() {
    return (
        <>
            <div className="page_head">
                <h1>Labs</h1>
            </div>
            <div className="chat-container">
                <div className="med-container">
                    <UploadPdf />
                </div>
            </div>
        </>
    );
}

export default Labs;
