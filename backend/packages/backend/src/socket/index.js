const { Server } = require("socket.io");
const routes = require("./routes");

function setup(server) {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    routes(io, socket);
  });
}

module.exports = setup;
