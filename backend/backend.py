# keep in alphabetical order to keep it clean
from dotenv import load_dotenv
from fastapi import FastAPI
import googleapiclient
import json
import os
import uvicorn

load_dotenv()

app = FastAPI()

@app.get("/")
def api_entry():
    return {"Welcome": "PatientPal API"}

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