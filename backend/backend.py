# keep in alphabetical order to keep it clean
from dotenv import load_dotenv
from fastapi import FastAPI, File, HTTPException, UploadFile
from fastapi.responses import JSONResponse
import healthcare
import json
import os
from typing import Optional
import shutil
import uvicorn

load_dotenv()

app = FastAPI()


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
