

let planets =[
    { id: 1, name: "Hearth"},
{ id: 2, name: "Mars"},
];

import "dotenv/config";
import "express-async-errors";
import pgPromise from "pg-promise";
import morgan from "morgan";
import planetsRouter from "./routes/planets";
import express, {json} from "express";

const app = express();

const db= pgPromise({})("postgres://postgres:Ruinedda2014!@localhost:5432/pianeti");

console.log(db);

const creaTabella = async()=>{
    await db.none(`
        CREATE TABLE IF NOT EXIST pianeti(
        id SERIAL PRIMARY KEY ,
        nome TEXT NOT NULL
        )
        `)

        console.log("Tabella creata correttamente");
}

const popolaPianeti = async()=>{
    await db.none(`
        INSERT INTO pianeti
        VALUES($1),($2)
        `, ["Marte", "Terra"])
        console.log("Avvenuto caricamento")
}

creaTabella().catch(console.error);
popolaPianeti().catch(console.error);

app.use(json());
app.use(morgan("dev"));

app.use("/api/planets", planetsRouter);

app.use((err, req, res, next)=>{
    console.error(err);
    res.status(500).json({msg: "innternal server error"});
});

