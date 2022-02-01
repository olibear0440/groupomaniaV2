//import package express
const express = require("express");

//import helmet (protection en-tete http)
const helmet = require("helmet");

//import variable d'environnement
require("dotenv").config();

const path = require("path");
const cors = require("cors");

//import morgan
const morgan = require("morgan");

//import rate-limit (protection force-brute)
const rateLimit = require("express-rate-limit");

//import des routes
const registerRoutes = require("./routes/register");
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");
const commentRoutes = require("./routes/comment");

//fonction de limitation de requete
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

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

app.use(limiter);
app.use(helmet());
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
