import pgPromise from "pg-promise";

const pgp = pgPromise();

const db = pgp({})("postgres://postgres:Ruinedda2014!@localhost:5432/esplanets");

export default db;
