const database = require("../sqlconnection");

//creer un utilisateur
exports.createUser = (req, res, next) => {
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  //const picture = req.body.picture;
  const email = req.body.email;
  const password = req.body.password;
  //userRole = 0-> "user", 1-> "admin" dans la bdd
  const userRole = 0;
  const userArray = [firstname, lastname, email, password, userRole];
  database.query(
    "INSERT INTO users (firstname, lastname, email, password, userRole) VALUES (?,?,?,?,?)",
    userArray,
    (err, rows, fields) => {
      if (!err)
        //res.send(rows);
        return res.status(201).json({
          message: "Objet enregistré dans la base de donnée",
          contenu: rows,
          rendu: req.body,
        });
      else {
        return res.status(401).json({
          message: "error : Utilisateur non créé dans la base de donnée ",
        });
      }
      //
    }
  );
};

//Afficher tous les utilisateurs
exports.getUsers = (req, res, next) => {
  database.query("SELECT * FROM users", (err, rows, fields) => {
    if (!err) res.send(rows);
    else
      return res.status(400).json({
        message: " error : impossible d'afficher la liste utilisateur",
      });
  });
};

//afficher un utilisateur
exports.getOneUser = (req, res, next) => {
  database.query(
    "SELECT * FROM users WHERE id = ?",
    [req.params.id],
    (err, rows, fields) => {
      if (!err && rows.length === 1) {
        const user = {
          email: rows[0].email,
          firstname: rows[0].firstname,
          lastname: rows[0].lastname,
          picture: rows[0].picture,
        };
        res.send(user);
      } else {
        return res
          .status(400)
          .json({ message: " error : impossible d'afficher cet utilisateur" });
      }
    }
  );
};

//appel de l'utilisateur de la session
exports.getCurrentUser = (req, res, next) => {
  const authToken = req.headers.authorization.split(" ")[1];
  const query = "SELECT * FROM users WHERE token = '" + authToken + "'";
  database.query(query, (err, rows, fields) => {
    if (!err) {
      if (rows.length !== 1) {
        res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      res.status(200).json(rows[0]);
    } else {
      res.status(501).json({ err });
    }
  });
};

//supprimer un utilisateur
exports.deleteUser = (req, res, next) => {
  database.query(
    "DELETE FROM users WHERE id = ?",
    [req.params.id],
    (err, rows, fields) => {
      if (!err) res.send("Utilisateur supprimé !");
      //console.log(err);
      else
        return res
          .status(400)
          .json({ message: " error : impossible de supprimer l'utilisateur" });
    }
  );
};

//modifier un utilisateur
exports.updateUser = (req, res, next) => {
  const id = req.params.id;
  const firstname = req.body.firstname;
  const password = req.body.password;
  const updateUserArray = [firstname, password, id];
  database.query(
    "UPDATE users SET firstname = ?, password = ? WHERE id = ?",
    updateUserArray,
    (err, rows, fields) => {
      if (!err) res.send("Infos utilisateur modifiées !");
      else console.log(err);
    }
  );
};
