import React, { useState } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage({ plants, setPlants }) {
  const [filteredPlants, setFilteredPlants] = useState(plants);

  const updatePlantStatus = (id, status) => {
    fetch(`http://localhost:6001/plants/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(status),
    })
      .then((response) => response.json())
      .then((updatedPlant) => {
        setPlants((prevPlants) =>
          prevPlants.map((plant) =>
            plant.id === updatedPlant.id ? updatedPlant : plant
          )
        );
        setFilteredPlants((prevFilteredPlants) =>
          prevFilteredPlants.map((plant) =>
            plant.id === updatedPlant.id ? updatedPlant : plant
          )
        );
      })
      .catch((error) => console.error("Error updating plant status:", error));
  };

  return (
    <main>
      <NewPlantForm
        onAddPlant={(newPlant) =>
          setPlants((prevPlants) => [...prevPlants, newPlant])
        }
      />
      <Search plants={plants} setFilteredPlants={setFilteredPlants} />
      <PlantList plants={filteredPlants} updatePlantStatus={updatePlantStatus} />
    </main>
  );
}

export default PlantPage;