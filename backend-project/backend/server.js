import express from "express";
import planetsRoutes from "./routes/planets.js";

const app = express();

app.use(express.json());

// cartella statica per immagini
app.use("/uploads", express.static("uploads"));

app.use("/planets", planetsRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server avviato su http://localhost:${PORT}`);
});
