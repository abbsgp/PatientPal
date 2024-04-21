from dotenv import load_dotenv
import google.generativeai as genai
import json
import os 



####Configuring API ####
load_dotenv()
api_key = os.getenv("GEMINI_APIKEY")
""" print("API Key:", api_key)"""
genai.configure(api_key=api_key)


def generateSummary(input_text):
    """Generates a summary of the input text using the Gemini API."""
    model = genai.GenerativeModel('gemini-pro')
    response = model.generate_content(input_text)
    return response.text

def loadDocument(file_path):
    """Loads JSON data from the specified file and returns it."""
    with open(file_path, 'r') as file:
        document = file.read()
    return document

# with open('output.json', 'r') as file:
#     input_data = json.load(file)

# user_input = input_data.get('userInput', '')

# prompt = "Summarize this document: "
# prompt_with_input = prompt + user_input



def summarizeDocument(language, document_File_Path):
    """Generates a summary of the document with prompt."""
    # Load document from output.json
    input_data = loadDocument(document_File_Path)
    # user_input = input_data.get('userInput', '')
    usageLanguage = language
    prompt = f"Summarize this document in {usageLanguage}. What type of text is it. What does it include. What do the results mean.  "
    prompt_with_input = prompt + input_data
    
    # Generate summary
    summary = generateSummary(prompt_with_input)
    print("Summary:", summary)
    
    # # Start a chat with user input
    # model = genai.GenerativeModel('gemini-pro')
    # chat = model.start_chat(history=[])
    # response = chat.send_message(user_input)
    # print("Response:", response.text)
    
    
#   """Uses Gemini API to generate a simple greeting."""
#   model = genai.GenerativeModel('gemini-pro')
#   chat = model.start_chat(history=[])
  
  
    
# #   user_input = input_data[userInput]

#   print(prompt_with_input)

#   # Simple prompt 
#   response = chat.send_message(prompt_with_input)

#   print(response.text)
  


if __name__ == "__main__":
    lang = "Spanish"
    FilePath = 'output.JSON'
    summarizeDocument(lang, FilePath)
    