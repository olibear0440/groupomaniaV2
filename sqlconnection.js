const mysql = require('mysql');

const database = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "phpmyadmin",
  database: "groupomania_socialnetwork",
});
database.connect(function (err) {
  if (err) throw err;
  console.log("Connecté à la base de données MySQL!");
});

module.exports = database;
