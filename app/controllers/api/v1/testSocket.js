testSocket = (app, io) => {
  app.post("/socket.io", (req, res) => {
    res.send({ response: "Hello" }).status(200);
  });

  app.get("/socket.io", (req, res) => {
    res.send({ response: "Hello" }).status(200);
  });

  let interval;

  io.on("connection", (socket) => {
    console.log("New client connected");
    if (interval) {
      clearInterval(interval);
    }
    interval = setInterval(() => getApiAndEmit(socket), 1000);
    socket.on("disconnect", () => {
      console.log("Client disconnected");
      clearInterval(interval);
    });
  });
  
  const getApiAndEmit = socket => {
    const response = new Date();
    socket.emit("FromAPI", response);
  };
}

module.exports = testSocket;
