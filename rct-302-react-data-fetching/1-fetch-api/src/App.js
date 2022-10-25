import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/albums/1/photos')
      .then(response => response.json())
      .then(data => {
        setPhotos(data);
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <div className='container'>
          {photos.map(photo => {
            return <img src={`${photo.thumbnailUrl}`} alt="" key={`${photo.id}`} />
          })}
        </div>
      </header>
    </div>
  );
}

export default App;
