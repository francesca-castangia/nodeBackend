
import {createServer} from "node:http";

const PORT = 3000;

const server = createServer((req,res)=>{
    console.log("request recived");
    res.statusCode= 200;
    res.setHeader("Content-Type","text/html");
    res.end(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Server Node.js</title>
      </head>
      <body>
        <h1>Ciao!</h1>
        <p>Questo è il mio messaggio personalizzato dal server Node.js.</p>
      </body>
    </html>
  `);
})

server.listen(PORT, () => {
  console.log(`Server in esecuzione su http://localhost:${PORT}`);
});