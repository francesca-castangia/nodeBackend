import express from "express";
import segni from "./signs.json" with {type: 'json'};
const app = express();
const PORT = 3000;

app.get("/", (req,res)=>{
    res.send("Il server è attivo correttamente");
});

app.get("/segno/:segno",(req,res)=>{
const {segno}= req.params;
if(!segno){
    res.status(404).json({error: "Segno zodiacale non trovato"});
}else{
    const segnoTrovato = segni.find((x)=> x.name_it.toLowerCase() === segno.toLowerCase() )
    if(!segnoTrovato){
        res.status(404).json({error: "Segno zodiacale non trovato"});
    } else{
        res.json(segnoTrovato);
    }
    
}

})

app.get("/elemento/:elemento", (req,res)=>{
    const {elemento} = req.params;
    
    const elementiTrovati = segni.filter((x)=>x.element.toLowerCase() === elemento.toLowerCase());
    if(elementiTrovati.length > 0){
       // res.json(elementiTrovati) 
       // output richiesto è una stringa "segni di {elemento}: {segno1},{segnp2}, {segno3}"
        const listaSegni = elementiTrovati.map((x)=> x.name_it);
        res.send(`Segni di ${elemento}: ${listaSegni}`);
    } else {
        res.status(404).json({error: "Nessun segno zodiacale trovato"})
    }
})

//fare altre richieste

app.listen(PORT, ()=>{
    console.log(`Il server è attivo su http://localhost:${PORT}`);
})