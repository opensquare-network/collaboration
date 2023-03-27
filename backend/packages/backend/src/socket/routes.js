const {
  handleSubscribeNotification,
  handleUnsubscribeNotification,
} = require("./notification");

function routes(io, socket) {
  socket.on("subscribe", (params) => {
    const { event } = params;
    if (event === "notification") {
      handleSubscribeNotification(io, socket, params.publicKey);
    }
  });

  socket.on("unsubscribe", (params) => {
    const { event } = params;
    if (event === "notification") {
      handleUnsubscribeNotification(io, socket, params.publicKey);
    }
  });
}

module.exports = routes;
