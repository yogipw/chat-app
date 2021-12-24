const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);

require("./db/db-connection");

app.use("/public", express.static("public"));
app.set("view engine", "ejs");

const Chat = require("./model/chat_model");

app.get("/", (req, res) => {
  Chat.find({})
    .then((messages) => {
      res.render("index", {
        messages,
        count: io.sockets.server.engine.clientsCount,
      });
    })
    .catch((err) => console.error(err));
});

io.on("connection", (socket) => {
  socket.on("chat", (data) => {
    Chat.create({ name: data.handle, message: data.message })
      .then(() => {
        io.sockets.emit("chat", data); // return data
      })
      .catch((err) => console.error(err));
  });
 
});

// listen
http.listen(process.env.PORT || 3000, () => {
  console.log("app listening on port: ", process.env.PORT || 3000);
});
