const express = require("express");
const cors = require("cors");
const connectDB = require("./db");
const router = require("./router.js");
const Pusher = require("pusher");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

const pusher = new Pusher({
  appId: "1494608",
  key: "4fdbda7428b820c4b701",
  secret: "39f111d79cccb8eb132f",
  cluster: "ap2",
  useTLS: true,
});

const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());

connectDB();

app.use(router);

const db = mongoose.connection;
db.once("open", () => {
  console.log("connection successful");
  const collection = db.collection("piecharts");
  const changeStream = collection.watch();
  changeStream.on("change", (change) => {
    console.log(change);
    const post = change.fullDocument;
    pusher.trigger("post", "inserted", {
      message: "hello",
    });
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server started on PORT ${process.env.PORT} `);
});
