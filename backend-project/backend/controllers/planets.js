import planets from "../data/planet";


// Restituire tutti i pianeti
const getAll = (req, res) => {
  res.json(planets);
};

// Restituire un pianeta tramite ID
const getOneById = (req, res) => {
  const id = parseInt(req.params.id);
  const planet = planets.find((p) => p.id === id);

  if (!planet) {
    return res.status(404).json({ message: "Planet not found" });
  }

  res.json(planet);
};

// Crea nuovo pianeta
const create = (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Name is required" });
  }

  const newPlanet = {
    id: planets.length ? planets[planets.length - 1].id + 1 : 1,
    name,
  };

  planets = [...planets, newPlanet]; // spread operator
  res.status(201).json(newPlanet);
};

// Aggiornare pianeti tramite id
const updateById = (req, res) => {
  const id = parseInt(req.params.id);
  const { name } = req.body;

  let found = false;
  planets = planets.map((p) => {
    if (p.id === id) {
      found = true;
      return { ...p, name: name || p.name };
    }
    return p;
  });

  if (!found) {
    return res.status(404).json({ message: "Planet not found" });
  }

  res.json({ message: "Planet updated successfully" });
};

// Eliminare un pianeta tramite id
const deleteById = (req, res) => {
  const id = parseInt(req.params.id);
  const initialLength = planets.length;

  planets = planets.filter((p) => p.id !== id);

  if (planets.length === initialLength) {
    return res.status(404).json({ message: "Planet not found" });
  }

  res.json({ message: "Planet deleted successfully" });
};

module.exports = {
  getAll,
  getOneById,
  create,
  updateById,
  deleteById,
};
