const express = require("express");
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");
const registerRoutes = require("./routes/register");
const commentRoutes = require("./routes/comment");
const path = require("path");
const cors = require("cors");

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
app.use(cors());
app.use(express.json());

app.use("/images", express.static(path.join(__dirname, "images")));

//les routes
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/registers", registerRoutes);
app.use("/comments", commentRoutes);

module.exports = app;
