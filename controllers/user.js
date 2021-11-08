const database = require("../sqlconnection");

//creer un utilisateur
exports.createUser = (req, res, next) => {
  const lastname = req.body.lastname;
  const firstname = req.body.firstname;
  const picture = req.body.picture;
  const email = req.body.email;
  const password = req.body.password;
  const userRole = req.body.userRole;
  const userArray = [lastname, firstname, picture, email, password, userRole];
  database.query(
    "INSERT INTO users (firstname, lastname, picture, email, password, userRole) VALUES (?,?,?,?,?,?)",
    userArray,
    (err, rows, fields) => {
      if (!err) res.send(rows);
      else console.log(err);
    }
  );
};

//Afficher les utilisateurs
exports.getUsers = (req, res, next) => {
  database.query("SELECT * FROM users", (err, rows, fields) => {
    if (!err) res.send(rows);
    else console.log(err);
  });
};

//afficher un utilisateur
exports.getOneUser = (req, res, next) => {
  database.query(
    "SELECT * FROM users WHERE id = ?",
    [req.params.id],
    (err, rows, fields) => {
      if (!err) res.send(rows);
      else console.log(err);
    }
  );
};

//appel de l'utilisateur de la session
exports.getCurrentUser = (req, res, next) => {
  let tokenConfig = [req.headers["authorization"]];
  database.query(
    "SELECT * FROM users WHERE Token = ?",
    tokenConfig,
    (err, rows, fields) => {
      if (!err) res.send(rows);
      else console.log(err);
    }
  );
};

//supprimer un utilisateur
exports.deleteUser = (req, res, next) => {
  database.query(
    "DELETE FROM users WHERE id = ?",
    [req.params.id],
    (err, rows, fields) => {
      if (!err) res.send("Utilisateur supprimé !");
      else console.log(err);
    }
  );
};
