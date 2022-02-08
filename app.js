//import package express
const express = require("express");

//import helmet (protection en-tete http)
const helmet = require("helmet");

//import xss-clean (nettoie les inputs users des requetes et des parametres url)
const xss = require("xss-clean");

//import variable d'environnement
require("dotenv").config();

const path = require("path");
const cors = require("cors");

//import morgan
const morgan = require("morgan");

//import des routes
const registerRoutes = require("./routes/register");
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");
const commentRoutes = require("./routes/comment");

//creation de l'application express
const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,DELETE,PATCH,OPTIONS"
  );
  next();
});

app.use(helmet());
app.use(xss());
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

//les routes
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/registers", registerRoutes);
app.use("/comments", commentRoutes);

//middleware dossier images
app.use("/images", express.static(path.join(__dirname, "images")));

//export de l'application
module.exports = app;
