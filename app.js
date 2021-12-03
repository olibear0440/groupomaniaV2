//import package express
const express = require("express");

//import variable d'environnement
require("dotenv").config();
//console.log(process.env.MESSAGE)

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
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());


app.use("/images", express.static(path.join(__dirname, "images")));

//les routes
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/registers", registerRoutes);
app.use("/comments", commentRoutes);

//export de l'application
module.exports = app;
