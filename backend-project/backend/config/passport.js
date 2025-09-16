import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import pg from "pg";
import dotenv from "dotenv";

dotenv.config();
const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET,
};

passport.use(
  new Strategy(options, async (payload, done) => {
    try {
      const result = await pool.query("SELECT * FROM users WHERE id = $1", [payload.id]);
      if (result.rows.length === 0) {
        return done(null, false);
      }
      return done(null, result.rows[0]);
    } catch (err) {
      return done(err, false);
    }
  })
);

export default passport;
