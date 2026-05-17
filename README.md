# ✍️ AI Handwriting Extractor

A full-stack web application that uses Google's Gemini 2.5 Flash multimodal AI to instantly extract digital text from pictures of handwritten notes. 

Built with a **React** frontend and a **Flask** backend, this tool allows users to upload images locally, preview them, and receive highly accurate text transcriptions with zero conversational filler from the AI.

## 🚀 Tech Stack

* **Frontend:** React (initialized via Vite)
* **Backend:** Python / Flask
* **AI Model:** Google Gemini API (`gemini-2.5-flash`)
* **Image Processing:** Pillow (PIL)

## 🛠️ Prerequisites

Before running this project, make sure you have the following installed on your machine:
* [Python 3.12+](https://www.python.org/downloads/)
* [Node.js & npm](https://nodejs.org/)
* A [Google Gemini API Key](https://aistudio.google.com/app/apikey)

## 💻 Local Setup & Installation

To get this project running locally, you will need to start both the backend server and the frontend development server in two separate terminal windows.

### 1. Clone the Repository
```bash
git clone [https://github.com/Kepler989/AI-text-extractor.git](https://github.com/Kepler989/AI-text-extractor.git)
cd AI-text-extractor
```

### 2. Backend Setup (Terminal 1)
Navigate to the backend directory, set up your isolated Python environment, and start the Flask server.

```bash
cd backend

# Create and activate a virtual environment (Mac)
python3.12 -m venv env
source env/bin/activate

# Install the required Python packages
pip install flask flask-cors google-genai pillow

# Set your Gemini API key as an environment variable
export GEMINI_API_KEY="your_actual_api_key_here"

# Start the Flask server
python server.py
```
*The backend will now be running on `http://127.0.0.1:5000`*

### 3. Frontend Setup (Terminal 2)
Open a new terminal window, navigate to the React frontend directory, install dependencies, and start the Vite server.

```bash
cd frontend/htr-frontend

# Install Node dependencies
npm install

# Start the React development server
npm run dev
```
*The frontend will now be running on `http://localhost:5173` (or the port Vite provides).*

## 📖 Usage
1. Open the frontend URL in your browser.
2. Click **"Choose an image..."** to upload a picture of handwritten text (`.jpg`, `.jpeg`, or `.png`).
3. Click **"Extract Text"**.
4. The backend will process the image stream, send it to Gemini, and return the transcribed digital text to your screen.
