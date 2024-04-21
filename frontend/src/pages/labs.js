import React from "react";
import { useState } from "react";
import axios from 'axios';
import "./home.css"
const apiUrl = 'http://localhost:4000';


function UploadPdf() {
    const [pdf, setPdf] = useState('')
    const [page_limit, setPagelimit] = useState(2)
    function handlePdf(e) {
        console.log(e.target.files)
        setPdf(e.target.files[0])
    }
    function handleApi(){
        const formData = new FormData()
        formData.append('file',pdf)
        axios.post(apiUrl + '/extract-medical-data?page_limit='+page_limit, formData).then((res => {
            console.log(res)
        }))
    }
    return(
        <div>
            <input id="fileInput" type="file" name="file" onChange={handlePdf} />
            <div className="lab-submit-container">
            <div  className="lab-submit-button">
            <button onClick={handleApi}>Submit</button>
            </div>
            </div>
        </div>
    )
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
};

export default Labs;