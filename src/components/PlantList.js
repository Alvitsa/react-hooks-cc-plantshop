import React from "react";
import PlantCard from "./PlantCard";

function PlantList({ plants, updatePlantStatus }) {
  return (
    <ul className="cards">
      {plants.map((plant) => (
        <PlantCard key={plant.id} plant={plant} updatePlantStatus={updatePlantStatus} />
      ))}
    </ul>
  );
}

export default PlantList;