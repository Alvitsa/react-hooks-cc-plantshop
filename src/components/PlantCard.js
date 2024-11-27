import React, { useState } from "react";

function PlantCard({ plant, updatePlantStatus }) {
  const [inStock, setInStock] = useState(true);

  const handleSoldOut = () => {
    setInStock(false);
    updatePlantStatus(plant.id, { inStock: false });
  };

  return (
    <li className="card" data-testid="plant-item">
      <img src={plant.image} alt={plant.name} />
      <h4>{plant.name}</h4>
      <p>Price: ${plant.price.toFixed(2)}</p>
      {inStock ? (
        <button onClick={handleSoldOut} className="primary">
          Mark as Sold Out
        </button>
      ) : (
        <button disabled>Sold Out</button>
      )}
    </li>
  );
}

export default PlantCard;