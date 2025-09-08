import db from "./db.js";

async function setupDb() {
  await db.none(`
    DROP TABLE IF EXISTS planets;

    CREATE TABLE planets(
      id SERIAL NOT NULL PRIMARY KEY,
      name TEXT NOT NULL
      image TEXT
    );
  `);

  await db.none("INSERT INTO planets (name) VALUES ($1)", ["Earth"]);
  await db.none("INSERT INTO planets (name) VALUES ($1)", ["Mars"]);

  console.log("Database pronto con Earth e Mars!");
}

setupDb().catch(err => console.error(err));
