const dotenv = require("dotenv");
dotenv.config({path: "./.env"});
const server = require("./app");

const port = process.env.PORT || 3000;

server.listen(port, () => {
    console.log("Start");
  console.log("===================== the server on port "+port+" =====================");
});

process.on("unhandledRejection", error => {
  console.log("unhandledRejection🔶🔶🔶",error.name);

  server.close( () => process.exit(1));
  
});

process.on("uncaughtException", error => {
  console.log("uncaughtException🔶🔶🔶",error.name);
  server.close( () => process.exit(1));
});

