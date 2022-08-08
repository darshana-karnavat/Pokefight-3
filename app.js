const express = require("express");
const mongoose = require("mongoose");
const Poke = require("./models/poke");
const app = express();
const dotenv = require("dotenv").config();
const cors = require("cors");

console.log(process.env.USERNAME);

//const routes = require("./routes");
const port = process.env.PORT || 3000;

const mongoDB = process.env.ACCESS_URL;
console.log(mongoDB);

app.use(cors());

mongoose.connect(mongoDB);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.get("/pokemon", (req, res) => Poke.find({}, (err, data) => res.send(data)));

app.get("/pokemon/:id/:info", (req, res) =>
  res.send(getPokemonInfoById(req.params.id, req.params.info))
);

app.get("/pokemon/:id", (req, res) => res.send(getPokemonById(req.params.id)));

app.listen(port, () => {
  console.log(process.env.USERNAME);
});

function getPokemonById(id) {
  console.log("Pokemon id:" + id);
  let data = jsonData.filter((data) => data.id == id);
  return data[0];
}
function getPokemonInfoById(id, info) {
  console.log("pokemon id:" + id + ", info:" + info);
  let data = jsonData.filter((data) => data.id == id)[0];

  if (info == "name") return data.name;
  else if (info == "base") return data.base;
  else if (info == "type") return data.type;
}
