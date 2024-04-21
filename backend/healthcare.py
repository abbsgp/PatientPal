from dotenv import load_dotenv
from google.auth.transport.requests import Request
from googleapiclient.discovery import build
from google.oauth2.service_account import Credentials
import os
from pypdf import PdfReader
import json

load_dotenv()

credentials = Credentials.from_service_account_file(
    os.getenv("GOOGLE_APPLICATION_CREDENTIALS"),
    subject=os.getenv("SUBJECT"),
    scopes=["https://www.googleapis.com/auth/cloud-platform"],
)

credentials.refresh(Request())

# Build the Healthcare API client
healthcare_service = build(
    "healthcare", "v1", credentials=credentials, cache_discovery=False
)

PROJECT_ID = credentials.project_id
LOCATION = os.getenv("LOCATION")
DATASET_ID = os.getenv("DATASET_ID")
FHIR_STORE = os.getenv("FHIR_STORE")

PARENT_ROUTE = f"projects/{PROJECT_ID}/locations/{LOCATION}"
FHIR_STORE_ROUTE = f"{PARENT_ROUTE}/datasets/{DATASET_ID}/fhirStores/{FHIR_STORE}"
NLP_ROUTE = f"{PARENT_ROUTE}/services/"


# def update_fhir_store(data: str):
# request = (
#     healthcare_service.projects()
#     .locations()
#     .datasets()
#     .fhirStores()
#     .fhir()
#     .create(
#         parent=FHIR_STORE_ROUTE,
#         type=data["type"],
#         body=data,
#     )
# )

# response = request.execute()

# return {"response_code": 200}


def translate_text(data: str, target_language="es"):
    translator = build("translate", "v2", credentials=credentials)
    if len(data) > 20000:
        return {
            "status_code": 400,
            "error_message": "data must be less than 20000 characters",
        }
    request = translator.translations().list(q=data, target=target_language)
    response = request.execute()

    return response


def extract_medical_text(filename: str):
    try:
        reader = PdfReader(filename)
    except FileNotFoundError:
        return {"response_code": 400, "error": "invalid filename"}
    pages = reader.pages
    text = ""
    responses = []
    for page in pages:
        new_text = page.extract_text()
        if len((text + new_text).encode("utf-16")) > 20000:
            request = (
                healthcare_service.projects()
                .locations()
                .services()
                .nlp()
                .analyzeEntities(
                    nlpService=f"{PARENT_ROUTE}/services/nlp",
                    body={
                        "documentContent": text,
                    },
                )
            )
            response = request.execute()
            responses.append(response)
        else:
            text += new_text
    # Process remaining text
    if text:
        request = (
            healthcare_service.projects()
            .locations()
            .services()
            .nlp()
            .analyzeEntities(
                nlpService=f"{PARENT_ROUTE}/services/nlp",
                body={
                    "documentContent": text,
                },
            )
        )
        response = request.execute()
        responses.append(response)

    combined = {}
    for i, response in enumerate(responses):
        combined[f"{i + 1}"] = response

    return json.dumps(combined, sort_keys=True)


# pings the FHIR DB
def make_api_request():
    request = (
        healthcare_service.projects()
        .locations()
        .datasets()
        .fhirStores()
        .get(name=FHIR_STORE_ROUTE)
    )
    # Make a sample API request (replace with your actual API endpoint)
    api_response = request.execute()

    # Print the response content (replace with your actual processing logic)
    return api_response


# For testing only
# print(extract_medical_text("sample_bloodtest.pdf"))

# print(translate_text("Hello world", target_language="es"))