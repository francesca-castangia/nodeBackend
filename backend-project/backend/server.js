require("dotenv").config();
require("express-async-errors");

const express = require("express");
const morgan = require("morgan");

const app = express();

// Dummy database
let planets = [
  {
    id: 1,
    name: "Earth",
  },
  {
    id: 2,
    name: "Mars",
  },
];

// Middleware
app.use(express.json()); // accetta JSON dal client
app.use(morgan("dev")); // log delle richieste client

// Routes di test
app.get("/", (req, res) => {
  res.send("Welcome to the Planet API!");
});

app.get("/planets", (req, res) => {
  res.json(planets);
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});