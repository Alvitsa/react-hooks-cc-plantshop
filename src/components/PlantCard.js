import React, { useState } from "react";

function PlantCard({ plant, updatePlantStatus }) {
  const [inStock, setInStock] = useState(plant.inStock || true);

  const handleSoldOut = () => {
    setInStock(false);
    updatePlantStatus(plant.id, { inStock: false });
  };

  return (
    <li className="card" data-testid="plant-item">
      <img src={plant.image} alt={plant.name} />
      <h4>{plant.name}</h4>
      <p>Price: {plant.price}</p>
      {inStock ? (
        <button onClick={handleSoldOut} className="primary">
          In Stock
        </button>
      ) : (
        <button disabled className="secondary">
          sold out
        </button>
      )}
    </li>
  );
}

export default PlantCard;