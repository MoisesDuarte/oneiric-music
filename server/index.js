// ? Project dependencies
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const config = require("./config/db");

// ? Project Initialization
const app = express();

// ? Database configuration
mongoose.set("useCreateIndex", true);
mongoose.connect(
    config.database, { useNewUrlParser: true }
  ).then(() => {
    console.info("Database connected successfully!");
  }).catch((err) => {
    console.info("Database Error:", err);
  });

// ? Registering CORS
app.use(cors());

// ? Body Parser configuration
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// ? Morgan Configuration
app.use(morgan("dev"));

// ? Routing
app.get("/", (req, res) => {
  res.json('API is online...');
});

// ? Server Listening
const PORT = process.env.port || 3000;
app.listen(PORT, () => {
  console.info(`App is running on ${PORT}`)
});
