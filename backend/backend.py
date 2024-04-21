# keep in alphabetical order to keep it clean
from dotenv import load_dotenv
import googleapiclient
import geminiAPI
from fastapi import FastAPI, File, HTTPException, UploadFile
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import healthcare
import json
import os
from typing import Optional
import shutil
import uvicorn

load_dotenv()

app = FastAPI()

origins = [
    '*'
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,  # Allow credentials (e.g., cookies, authorization headers)
    allow_methods=["*"],    # Specify allowed HTTP methods (or use wildcard "*")
    allow_headers=["*"],    # Specify allowed HTTP headers (or use wildcard "*")
)


@app.get("/")
async def api_entry():
    return {"Welcome": "PatientPal API"}


@app.get("/ping-healthcare")
async def request_healthcare():
    response = healthcare.make_api_request()
    return response


@app.post("/extract-medical-data")
async def extract(file: UploadFile = File(...), page_limit: Optional[int] = -1):
    if file.content_type != "application/pdf":
        raise HTTPException(status_code=400, detail="Invalid file type. Must be PDF.")
    with open(file.filename, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    response = healthcare.extract_medical_text(file.filename, page_limit=page_limit)
    os.remove(file.filename)
    return JSONResponse(content=json.loads(response))


class DocumentSummaryRequest(BaseModel):
    language: str
    file_path: str | None = 'output.JSON'
    
    
@app.post("/summarize-document")
async def summarize_file(request_body: DocumentSummaryRequest):
    language = request_body.language
    file_path = request_body.file_path
    try:
        summary = geminiAPI.summarizeDocument(language, file_path)
    except Exception as e:
        raise HTTPException(status_code=400, detail="Try")
    
    return summary

class UserInput(BaseModel):
    language: str
    user_input:str
    
    
@app.post("/start-chat")
async def start_chat(request_body: UserInput):
    language = request_body.language
    user_input = request_body.user_input
    try:
        model_response = geminiAPI.startChat(user_input, language)
    except Exception as e:
        return {"error": "teehheee"}
    
    return model_response


def main():
    try:
        HOST = os.getenv("HOST")
        PORT = int(os.getenv("PORT"))
    except Exception:
        print(
            "Error: Please make sure you have set the HOST and PORT environment variables correctly."
        )
        exit(2)
    uvicorn.run(
        app,
        host=HOST,
        port=PORT,
        log_level="info",
    )


if __name__ == "__main__":
    main()
