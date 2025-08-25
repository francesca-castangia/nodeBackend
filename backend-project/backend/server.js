import {createServer} from "node:http";

const PORT = 3000;

const server = createServer((req,res)=>{
    const body = JSON.stringify({ location: "Mars" });

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Content-Length", Buffer.byteLength(body)); //perchè buffer.byteLength conta i byte, si usa per avere una lunghezza corretta

  res.end(body);
})

server.listen(PORT, () => {
  console.log(`Server in esecuzione su http://localhost:${PORT}`);
});