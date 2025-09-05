require("dotenv").config();
require("express-async-errors");

const express = require("express");
const morgan = require("morgan");

const planetsRouter = require("./planetsRouter");

const app = express();

//  Middleware
app.use(express.json());
app.use(morgan("dev"));

//  Routes
app.use("/api/planets", planetsRouter);

//  Error handler globale
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

//  Avvio server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
