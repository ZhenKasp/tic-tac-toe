testSocket = (app) => {
  app.post("/socket.io", (req, res) => {
    res.send({ response: "I am alive" }).status(200);
  });

  app.get("/socket.io", (req, res) => {
    res.send({ response: "I am alive" }).status(200);
  });
}

module.exports = testSocket;
