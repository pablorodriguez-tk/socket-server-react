//Servidor de Express
const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const path = require("path");
const Sockets = require("./sockets");
const cors = require("cors");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    //Http server
    this.server = http.createServer(this.app);
    //Configuracion del socket server
    this.io = socketio(this.server, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
      },
    });
  }

  middlewares() {
    //Desplegar el directorio publico
    this.app.use(express.static(path.resolve(__dirname, "../public")));
    //Cors
    this.app.use(cors());
  }

  configurarSockets() {
    new Sockets(this.io);
  }

  execute() {
    //Inicializar Middlewares
    this.middlewares();

    //Inicializar Sockets
    this.configurarSockets();

    //Inicializar Server
    this.server.listen(this.port, () => {
      console.log("Server corriendo en puerto: ", this.port);
    });
  }
}

module.exports = Server;
