
import express from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bodyParser from "body-parser";
import passport from "./passport.js";
import userRoutes from "./routes/users.js";
import planetRoutes from "./routes/planets.js";

dotenv.config();

const app = express();
app.use(bodyParser.json());

// array come finto DB
const users = []; 

// ---------------- registrazione ----------------
app.post("/users/signup", (req, res) => {
  const { username, password } = req.body; // prendo username e psw da req.body

  if (!username || !password) { //controllo che esistano username e psw
    return res.status(400).json({ error: "Username e password sono richiesti." });
  }

  // controllo se esiste già un utente con quelle credenziali
  const exists = users.find(u => u.username === username);
  if (exists) {
    return res.status(400).json({ error: "Username già esistente." });
  }

  const newUser = { // creo un oggetto se è ok
    id: users.length + 1,
    username,
    password, 
  };
  users.push(newUser); // pusho in user

  return res.json({ msg: "Signup successful. Now you can log in." });
});

// ----------------LOGIN ----------------
app.post("/users/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Username e password sono richiesti." });
  }

  const user = users.find(u => u.username === username); // cerca l'utente in users
  if (!user) {
    return res.status(401).json({ error: "Credenziali non valide." });
  }

  if (user.password !== password) {
    return res.status(401).json({ error: "Credenziali non valide." });
  }

  // genera JWT se va bene 
  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET, // secret preso da .env 
    { expiresIn: "1h" } // durata
  );

  // salviamo il token nell'oggetto utente
  user.token = token;

  return res.json({
    token,
    id: user.id,
    username: user.username,
  });
});

// ----------------------------------------
app.use(express.json());
app.use(passport.initialize());

app.use("/users", userRoutes);
app.use("/planets", planetRoutes);

// ---------------- START SERVER ----------------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server avviato su http://localhost:${PORT}`));
