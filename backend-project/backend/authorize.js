//middleware

import passport from "./passport.js";

export const authorize = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (err || !user) {
      return res.status(401).json({ error: "Non autorizzato" });
    }
    req.user = user; // importanza: req.user diventa l’utente autenticato
    next();
  })(req, res, next);
};
