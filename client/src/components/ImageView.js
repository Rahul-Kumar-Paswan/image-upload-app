import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css'; // Import your CSS file

function ImageView() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/images')
      .then((response) => {
        setImages(response.data);
      })
      .catch((error) => {
        console.error('Error fetching images:', error);
      });
  }, []);

  return (
    <div>
      <h2>View Images</h2>
      <div className="image-container">
        {images.map((image) => (
          <img
            key={image.id}
            src={`http://localhost:5000/uploads/${image.filename}`}
            alt={image.filename}
          />
        ))}
      </div>
    </div>
  );
}

export default ImageView;
