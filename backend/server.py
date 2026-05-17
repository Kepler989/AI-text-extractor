from flask import Flask, request, jsonify
from flask_cors import CORS
from google import genai
from PIL import Image
import io

app = Flask(__name__)
# Enable CORS so your React application can safely send requests to this server
CORS(app)

# Initialize the Gemini client (automatically uses GEMINI_API_KEY from environment)
try:
    client = genai.Client()
except Exception as e:
    print("Warning: Gemini client failed to initialize. Check your API key.")
    client = None

@app.route('/api/extract', methods=['POST'])
def extract_text():
    if not client:
        return jsonify({'error': 'Gemini API key is not configured on the server.'}), 500

    # Check if an image file was uploaded
    if 'image' not in request.files:
        return jsonify({'error': 'No image file uploaded.'}), 400
        
    image_file = request.files['image']
    
    try:
        # Read the file directly from the network stream into Pillow
        image = Image.open(image_file.stream)
        
        prompt = "Extract all the handwritten text from this image exactly as it is written. Provide only the extracted text."
        
        # Generate content using Gemini 2.5 Flash
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=[image, prompt]
        )
        
        # Return the clean text data back to the frontend
        return jsonify({'text': response.text})
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    # Runs the backend on http://localhost:5000
    app.run(port=5000, debug=True)