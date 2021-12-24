const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

mongoose.connect("mongodb://127.0.0.1:27017/chat", { useMongoClient: true });

mongoose.connection
  .once("open", () => console.log("Connected to the database"))
  .on("error", (err) => console.error(err));
