import * as fs from 'node:fs';


const contenuto = 'Ciao! Questo è un file scritto con fs.writeFile()';

// nome del file di output
const nomeFile = 'output.txt';

// uso writeFile con la callback
fs.writeFile(nomeFile, contenuto, 'utf8', (err) => {
  if (err) {
    console.error('Errore durante la scrittura del file:', err);
    return;
  }
  console.log(`File "${nomeFile}" creato con successo!`);
});
