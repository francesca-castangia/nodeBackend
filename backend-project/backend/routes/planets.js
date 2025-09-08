import { Router } from "express";
import multer from "multer";
import { getAll, getOne, create, update, remove, uploadImage } from "../controllers/planets.js";

const router = Router();

// Configurazione multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // cartella uploads
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});
const upload = multer({ storage });

router.get("/", getAll);
router.get("/:id", getOne);
router.post("/", create);
router.put("/:id", update);
router.delete("/:id", remove);
// Nuova rotta per upload immagine
router.post("/:id/image", upload.single("image"), uploadImage);

export default router;
