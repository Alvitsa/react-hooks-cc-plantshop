import React, { useState, useEffect } from 'react';
import PlantCard from './PlantCard';
import NewPlantForm from './NewPlantForm';
import SearchBar from './Search';

function App() {
  const [plants, setPlants] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch plants on mount
  useEffect(() => {
    fetch('http://localhost:6001/plants')
      .then((response) => response.json())
      .then((data) => setPlants(data));
  }, []);

  // Filter plants by search query
  const filteredPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Add a new plant
  function addPlant(newPlant) {
    setPlants([...plants, newPlant]);
  }

  // Mark a plant as sold out
  function markAsSoldOut(id) {
    setPlants((plants) =>
      plants.map((plant) =>
        plant.id === id ? { ...plant, soldOut: true } : plant
      )
    );
  }

  return (
    <div className="app">
      <header>
        <h1>
          Plantsy <span className="logo" role="img">🌱</span>
        </h1>
      </header>
      <main>
        <NewPlantForm onAddPlant={addPlant} />
        <SearchBar onSearch={setSearchQuery} />
        <ul className="cards" data-testid="plant-list">
          {filteredPlants.map((plant) => (
            <PlantCard
              key={plant.id}
              plant={plant}
              onSoldOut={markAsSoldOut}
            />
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;