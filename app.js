const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
var path = require("path");

var cors = require("cors");
const server = require("./routes/routes");
const app = express();
const config = require("./config/db_config");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

mongoose
  .connect(config.MongoURI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));
var port = process.env.PORT || 3001;

app.use(express.static(path.join(__dirname, "client/build")));

app.use("/", server);

app.listen(port);
console.log("App is running on port " + port);
