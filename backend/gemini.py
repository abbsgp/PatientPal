from dotenv import load_dotenv
import google.generativeai as genai
import os 

# Load API key from .env file
load_dotenv()
api_key = os.getenv("GEMINI_APIKEY")
# print("API Key:", api_key)
genai.configure(api_key=api_key)

userInput = "say hi to me"

def say_hi():
  """Uses Gemini API to generate a simple greeting."""
  model = genai.GenerativeModel('gemini-pro')
  chat = model.start_chat(history=[])

  # Simple prompt 
  response = chat.send_message(userInput)

  print(response.text)


if __name__ == "__main__":
    say_hi()