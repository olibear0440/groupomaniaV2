const database = require("../sqlconnection");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

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
          password: rows[0].password,
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

//modifier le mot de passe de l'utilisateur
exports.updateUser = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const userId = jwt.decode(token, process.env.JWT_KEY).userId;
  database.query(
    "SELECT * FROM users WHERE id=?",
    [userId],
    (err, results, fields) => {
      if (err) return res.status(500).json({ error: "Erreur systeme !" });
      //Si le resultat est null ou supérieur à 1 retour de la bdd
      if (results.length !== 1) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      //si utilisateur trouvé on compare le password a la requete du frontEnd
      bcrypt
        .compare(req.body.currentPassword, results[0].password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }
          //Si password reconnu, on crypte le nouveau mot de passe...
          bcrypt
            .hash(req.body.newPassword, 10)
            .then((newPassword) => {
              //...on passe la requete de modification du mot de passe
              database.query(
                "UPDATE users SET password=? WHERE id=?",
                [newPassword, userId],
                (err, rows, field) => {
                  if (err) {
                    return res.status(400).json(err);
                  }
                  return res
                    .status(201)
                    .json({ message: "mot de passe utilisateur modifié !" });
                }
              );
            })
            .catch((error) => res.status(501).json({ error }));
        })
        .catch((error) => res.status(501).json({ error }));
    }
  );
};
