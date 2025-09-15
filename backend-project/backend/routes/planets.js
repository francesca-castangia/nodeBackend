
import express from "express";
import multer from "multer";
import { authorize } from "../middleware/authorize.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// Solo utenti loggati possono caricare
router.post("/upload", authorize, upload.single("planet"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "File non trovato." });
  }
  return res.json({ msg: "Immagine pianeta caricata!", file: req.file });
});

export default router;
