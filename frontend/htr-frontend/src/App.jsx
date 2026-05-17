import { useState } from 'react';

function App() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [extractedText, setExtractedText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Handle local image file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file)); // Create a local preview URL
      setExtractedText('');
      setError('');
    }
  };

  // Send the image file to the Flask backend
  const handleUpload = async () => {
    if (!image) {
      setError('Please select an image first.');
      return;
    }

    setLoading(true);
    setError('');
    setExtractedText('');

    const formData = new FormData();
    formData.append('image', image);

    try {
      const response = await fetch('http://localhost:5000/api/extract', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to extract text.');
      }

      setExtractedText(data.text);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '50px auto', fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <h2>✍️ AI Handwriting Extractor</h2>
      <p style={{ color: '#666' }}>Upload a handwritten document to convert it to digital text using Gemini API.</p>
      
      <div style={{ margin: '20px 0' }}>
        <input type="file" accept="image/*" onChange={handleImageChange} />
      </div>

      {preview && (
        <div style={{ marginBottom: '20px' }}>
          <img src={preview} alt="Preview" style={{ maxWidth: '100%', maxHeight: '300px', borderRadius: '8px', border: '1px solid #ddd' }} />
        </div>
      )}

      <button 
        onClick={handleUpload} 
        disabled={loading}
        style={{
          padding: '10px 20px',
          backgroundColor: loading ? '#ccc' : '#0070f3',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: loading ? 'not-allowed' : 'pointer',
          fontSize: '16px'
        }}
      >
        {loading ? 'Processing with AI...' : 'Extract Text'}
      </button>

      {error && <p style={{ color: 'red', marginTop: '20px' }}>⚠️ {error}</p>}

      {extractedText && (
        <div style={{ marginTop: '30px' }}>
          <h3>Extracted Output:</h3>
          <textarea 
            value={extractedText} 
            readOnly 
            rows={10} 
            style={{ 
              width: '100%', 
              padding: '12px', 
              borderRadius: '6px', 
              borderColor: '#ccc',
              backgroundColor: '#f9f9f9',
              fontFamily: 'monospace',
              color:"black"
            }}
          />
        </div>
      )}
    </div>
  );
}

export default App;