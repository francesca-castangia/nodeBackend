
import express from "express";
import { authorize } from "../middleware/authorize.js";
import pkg from "pg";

const { Pool } = pkg;
const router = express.Router();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// LOGOUT
router.get("/logout", authorize, async (req, res) => {
  try {
    await pool.query(
      "UPDATE users SET token = NULL WHERE id = $1",
      [req.user.id]
    );
    return res.json({ msg: "Logout effettuato con successo." });
  } catch (err) {
    return res.status(500).json({ error: "Errore durante il logout." });
  }
});

export default router;
