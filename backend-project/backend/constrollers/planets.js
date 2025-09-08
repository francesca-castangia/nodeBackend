import db from "../db.js";

// GET /planets
export async function getAll(req, res) {
  try {
    const planets = await db.any("SELECT * FROM planets;");
    res.json(planets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// GET /planets/:id
export async function getOne(req, res) {
  try {
    const planet = await db.oneOrNone("SELECT * FROM planets WHERE id=$1;", [req.params.id]);
    if (!planet) return res.status(404).json({ error: "Planet not found" });
    res.json(planet);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// POST /planets
export async function create(req, res) {
  try {
    const { name } = req.body;
    await db.none("INSERT INTO planets (name) VALUES ($1);", [name]);
    res.status(201).json({ message: "Planet created" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// PUT /planets/:id
export async function update(req, res) {
  try {
    const { name } = req.body;
    const result = await db.result("UPDATE planets SET name=$2 WHERE id=$1;", [req.params.id, name]);
    if (result.rowCount === 0) return res.status(404).json({ error: "Planet not found" });
    res.json({ message: "Planet updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// DELETE /planets/:id
export async function remove(req, res) {
  try {
    const result = await db.result("DELETE FROM planets WHERE id=$1;", [req.params.id]);
    if (result.rowCount === 0) return res.status(404).json({ error: "Planet not found" });
    res.json({ message: "Planet deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }

  
}

// POST /planets/:id/image
export async function uploadImage(req, res) {
  try {
    const planetId = req.params.id;
    const filePath = req.file.path; // multer mette qui il path del file

    const result = await db.result(
      "UPDATE planets SET image=$2 WHERE id=$1;",
      [planetId, filePath]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Planet not found" });
    }

    res.json({ message: "Planet image uploaded", imagePath: filePath });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
