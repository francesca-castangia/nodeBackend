const express = require("express");
const Joi = require("joi");

const router = express.Router();

//  Dummy database
let planets = [
  { id: 1, name: "Earth" },
  { id: 2, name: "Mars" },
];

//  Schema di validazione con Joi
const planetSchema = Joi.object({
  name: Joi.string().min(2).required(),
});

// -------------------- ROUTES --------------------

// GET /api/planets -> restituisce tutti i pianeti
router.get("/", (req, res) => {
  res.status(200).json(planets);
});

// GET /api/planets/:id -> restituisce un pianeta per id
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const planet = planets.find((p) => p.id === id);

  if (!planet) {
    return res.status(404).json({ msg: "Planet not found" });
  }

  res.status(200).json(planet);
});

// POST /api/planets -> crea un nuovo pianeta
router.post("/", (req, res) => {
  const { error, value } = planetSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ msg: error.details[0].message });
  }

  const newPlanet = {
    id: planets.length ? planets[planets.length - 1].id + 1 : 1,
    name: value.name,
  };

  planets.push(newPlanet);

  res.status(201).json({ msg: "Planet created successfully" });
});

// PUT /api/planets/:id -> aggiorna un pianeta
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { error, value } = planetSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ msg: error.details[0].message });
  }

  const planetIndex = planets.findIndex((p) => p.id === id);
  if (planetIndex === -1) {
    return res.status(404).json({ msg: "Planet not found" });
  }

  planets[planetIndex].name = value.name;

  res.status(200).json({ msg: "Planet updated successfully" });
});

// DELETE /api/planets/:id -> elimina un pianeta
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const planetIndex = planets.findIndex((p) => p.id === id);

  if (planetIndex === -1) {
    return res.status(404).json({ msg: "Planet not found" });
  }

  planets.splice(planetIndex, 1);

  res.status(200).json({ msg: "Planet deleted successfully" });
});

module.exports = router;
