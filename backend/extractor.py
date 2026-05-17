import sys
from google import genai
from PIL import Image

def extract_handwriting(image_path):
    # Initialize the client. It automatically picks up the GEMINI_API_KEY environment variable.
    try:
        client = genai.Client()
    except Exception as e:
        print("Error: Could not initialize the Gemini client.")
        print("Make sure you have set your GEMINI_API_KEY environment variable.")
        sys.exit(1)
    
    print(f"Loading image: '{image_path}'...")
    try:
        image = Image.open(image_path)
    except FileNotFoundError:
        print(f"Error: Could not find '{image_path}'. Check the file name and make sure it's in the same folder.")
        sys.exit(1)
        
    print("Extracting text... (this might take a moment)")
    
    # The prompt instructing the AI on exactly what to do
    prompt = "Extract all the handwritten text from this image exactly as it is written. Provide only the extracted text."
    
    try:
        # We use the 2.5-flash model as it is fast and excellent at reading images
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=[image, prompt]
        )
        
        print("\n=== Extracted Text ===")
        print(response.text)
        print("======================\n")
        
    except Exception as e:
        print(f"An API error occurred: {e}")

if __name__ == "__main__":
    # Change 'handwriting.jpg' to whatever your image is actually named
    target_image = "handwriting.jpg"
    extract_handwriting(target_image)