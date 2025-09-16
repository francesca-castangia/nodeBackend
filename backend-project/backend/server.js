import express from "express";
import passport from "./config/passport.js";
import authRoutes from "./routes/auth.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
app.use(passport.initialize());

app.use("/auth", authRoutes);

// Rotta protetta
app.get(
  "/protected",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({ message: "Accesso consentito", user: req.user });
  }
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server avviato su porta ${PORT}`));
