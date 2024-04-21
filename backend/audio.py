from dotenv import load_dotenv
from pathlib import Path
import hashlib
import google.generativeai as genai
import os 
import sounddevice as sd
from scipy.io.wavfile import write
import wavio as wv


####Configuring API ####
load_dotenv()
api_key = os.getenv("GEMINI_APIKEY")
""" print("API Key:", api_key)"""
genai.configure(api_key=api_key)

# Sampling frequency
freq = 44100
# Recording duration
duration = 10
# filename
file_name = "userRecording.wav"



def uploadAudio():
    your_file = genai.upload_file(path=file_name)
    prompt = "Answer the question in 3-4 sentances and simple terms asked in the audio byt the patient based on this summary:**Type of text:** This is a patient report. It includes a list of various laboratory test results.\n\n**What does it include?:**\n- Complete Blood Count (CBC): this includes measurements of Hemoglobin, Hematocrit (HCT), RBC Count, MCV, MCH, MCHC, and RDW;\n- Differential Leucocyte Count: this includes measurements of segmented neutrophils, lymphocytes, monocytes, eosinophils, and basophils;\n- Platelet Count and Mean Platelet Volume.\n\n**What do the results mean:** The results of this blood test are within normal limits. This means that the patient's blood counts are normal and there are no signs of any underlying medical conditions."
    model = genai.GenerativeModel('models/gemini-1.5-pro-latest')
    response = model.generate_content([prompt, your_file])    
    modelResponse = response.text

    print(response.text)
    return {"modelResponse": modelResponse}

def record():
# Start recorder with the given values of duration and sample frequency
    print("Starting recording")

    recording = sd.rec(int(duration * freq), 
				samplerate=freq, channels=2)

# Record audio for the given number of seconds
    sd.wait()
    print("Finished recording")
    write(file_name, freq, recording)

    
def generate_userAudio():
    print("checking 1,2,3")
    
    record()
    
    uploadAudio()