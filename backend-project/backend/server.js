import express from "express";



const app = express();
const planetsRoutes = require("./routes/planets");

app.use(express.json()); // per leggere JSON body
app.use("/api/planets", planetsRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
