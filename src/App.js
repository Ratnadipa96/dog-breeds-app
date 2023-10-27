import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Import a CSS file for styling

function App() {
  const [breeds, setBreeds] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState('');
  const [dogImage, setDogImage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the list of dog breeds
    axios.get('https://dog.ceo/api/breeds/list/all')
      .then((response) => {
        const breedList = Object.keys(response.data.message);
        setBreeds(breedList);
      })
      .catch((error) => {
        setError('Error fetching dog breeds. Please try again later.');
        console.error('Error fetching dog breeds:', error);
      });
  }, []);

  const fetchRandomDogImage = () => {
    if (selectedBreed) {
      setIsLoading(true);
      setError(null);

      axios.get(`https://dog.ceo/api/breed/${selectedBreed}/images/random`)
        .then((response) => {
          setDogImage(response.data.message);
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
          setError('Error fetching dog image. Please try again later.');
          console.error('Error fetching dog image:', error);
        });
    }
  };

  return (
    <div className="app-container">
      <h1>Dog Breed Viewer</h1>
      <label htmlFor="breedSelect">Select a dog breed:</label>
      <select
        id="breedSelect"
        value={selectedBreed}
        onChange={(e) => setSelectedBreed(e.target.value)}
      >
        <option value="">Select a breed</option>
        {breeds.map((breed, index) => (
          <option key={index} value={breed}>
            {breed}
          </option>
        ))}
      </select>
      <button onClick={fetchRandomDogImage}>Fetch Image</button>

      {error && <p className="error">{error}</p>}

      {isLoading && <p>Loading...</p>}

      {dogImage && (
        <div>
          <h2>Random {selectedBreed}:</h2>
          <img src={dogImage} alt={selectedBreed} />
        </div>
      )}
    </div>
  );
}

export default App;
