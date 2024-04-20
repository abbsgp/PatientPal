from dotenv import load_dotenv
import google.generativeai as genai
import os 

load_dotenv()

genai.configure(api_key=os.environ["GEMINI_APIKEY"])
model = genai.GenerativeModel('gemini')