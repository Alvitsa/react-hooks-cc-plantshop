const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 6001;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory database simulation
let plants = [
  {
    id: 1,
    name: "Aloe",
    image: "./images/aloe.jpg",
    price: 15.99,
  },
  {
    id: 2,
    name: "ZZ Plant",
    image: "./images/zz-plant.jpg",
    price: 25.98,
  },
];

let nextId = plants.length + 1;

// Endpoints

// GET /plants - Retrieve all plants
app.get("/plants", (req, res) => {
  res.status(200).json(plants);
});

// POST /plants - Add a new plant
app.post("/plants", (req, res) => {
  const { name, image, price } = req.body;

  // Validate required fields
  if (!name || !image || typeof price !== "number") {
    return res.status(400).json({ error: "Invalid plant data" });
  }

  const newPlant = {
    id: nextId++,
    name,
    image,
    price,
  };

  plants.push(newPlant);
  res.status(201).json(newPlant);
});

// PATCH /plants/:id - Update the price of a plant
app.patch("/plants/:id", (req, res) => {
  const { id } = req.params;
  const { price } = req.body;

  // Validate the price field
  if (typeof price !== "number") {
    return res.status(400).json({ error: "Invalid price" });
  }

  const plant = plants.find((plant) => plant.id === parseInt(id));

  if (!plant) {
    return res.status(404).json({ error: "Plant not found" });
  }

  plant.price = price;
  res.status(200).json(plant);
});

// DELETE /plants/:id - Delete a plant
app.delete("/plants/:id", (req, res) => {
  const { id } = req.params;

  const plantIndex = plants.findIndex((plant) => plant.id === parseInt(id));

  if (plantIndex === -1) {
    return res.status(404).json({ error: "Plant not found" });
  }

  plants.splice(plantIndex, 1);
  res.status(200).json({});
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});