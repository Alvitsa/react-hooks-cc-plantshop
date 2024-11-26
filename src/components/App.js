import React, { useState } from 'react';
import '../index.css';

const App = () => {
  const [plants, setPlants] = useState([
    { name: "Aloe", image: "./images/aloe.jpg", price: 15.99, soldOut: false },
    { name: "ZZ Plant", image: "./images/zz_plant.jpg", price: 25.98, soldOut: false },
    { name: "Pile peperomioides", image: "./images/pilea_peperomioides.jpg", price: 5.99, soldOut: false },
    { name: "Pothos", image: "./images/pothos.jpg", price: 12.11, soldOut: false },
    { name: "Jade", image: "./images/jade_plant.jpg", price: 10.37, soldOut: false },
    { name: "Monstera Deliciosa", image: "./images/monstera_deliciosa.jpg", price: 25.99, soldOut: false },
    { name: "Fiddle Leaf Fig", image: "./images/fiddle_leaf_plant.jpg", price: 55.00, soldOut: false }
  ]);

  const [newPlant, setNewPlant] = useState({ name: '', image: '', price: '' });
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddPlant = () => {
    const plant = { ...newPlant, soldOut: false };
    setPlants([...plants, plant]);
    setNewPlant({ name: '', image: '', price: '' });
  };

  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  const handleSoldOutToggle = (index) => {
    const updatedPlants = plants.map((plant, i) =>
      i === index ? { ...plant, soldOut: !plant.soldOut } : plant
    );
    setPlants(updatedPlants);
  };

  const filteredPlants = plants.filter(plant => 
    plant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app">
      <header>
        <h1>Plantsy <span className="logo">🌱</span></h1>
      </header>

      <section className="new-plant-form">
        <h2>Add New Plant</h2>
        <form>
          <input
            type="text"
            placeholder="Plant name"
            value={newPlant.name}
            onChange={(e) => setNewPlant({ ...newPlant, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Image URL"
            value={newPlant.image}
            onChange={(e) => setNewPlant({ ...newPlant, image: e.target.value })}
          />
          <input
            type="number"
            placeholder="Price"
            value={newPlant.price}
            onChange={(e) => setNewPlant({ ...newPlant, price: e.target.value })}
          />
          <button type="button" className="primary" onClick={handleAddPlant}>Add Plant</button>
        </form>
      </section>

      <section className="searchbar">
        <label>Search Plants:</label>
        <input
          type="text"
          placeholder="Type a name to search"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </section>

      <section className="cards">
        {filteredPlants.map((plant, index) => (
          <div className="card" key={index}>
            <img src={plant.image} alt={plant.name} />
            <h4>{plant.name}</h4>
            <p>${plant.price}</p>
            <button 
              className={plant.soldOut ? 'disabled' : 'primary'} 
              onClick={() => handleSoldOutToggle(index)}
              disabled={plant.soldOut}>
              {plant.soldOut ? 'Sold Out' : 'Mark as Sold Out'}
            </button>
          </div>
        ))}
      </section>
    </div>
  );
};

export default App;