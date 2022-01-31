const database = require("../sqlconnection");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const passwordSchema = require("../passwordValidate");
require("dotenv").config();

/*
  Renvoi les utilisateurs
*/
exports.getUsers = (req, res, next) => {
  database.query("SELECT * FROM users", (err, rows, fields) => {
    if (!err) res.send(rows);
    else
      return res.status(400).json({
        message: " error : impossible d'afficher la liste utilisateur",
      });
  });
};

/*
  Renvoi un utilisateur par son ID
*/
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

/*
  Renvoi à l'utilisateur de la session par son token
*/
exports.getCurrentUser = (req, res, next) => {
  const authToken = req.headers.authorization.split(" ")[1];
  const query = "SELECT * FROM users WHERE token = ?";
  database.query(query, [authToken], (err, rows, fields) => {
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

/*
  Supprimer un utilisateur, 
  ses j'aimes,
  ses commentaires et
  ses publications 
*/
exports.deleteUser = (req, res, next) => {
  const user_id = req.params.id;
  //supprimer les j'aimes liés à l'user
  const query = "DELETE from likes WHERE user_id = ?";
  database.query(query, [user_id], (err, rows, fields) => {
    if (err) {
      res.status(400).json({
        message:
          "error : impossible de supprimer les j'aimes de cet utilisateur",
      });
    }
    //si pas d'erreur, supprimer les commentaires liés à l'user
    const query = "DELETE from comments WHERE user_id = ?";
    database.query(query, [user_id], (err, rows, fields) => {
      if (err) {
        res.status(400).json({
          message:
            "error : impossible de supprimer les commentaires de cet utilisateur",
        });
      }
      //si pas d'erreur, renvois les publications liées à l'user...
      const query = "SELECT * FROM posts WHERE user_id = ?";
      database.query(query, [req.params.id], (err, rows, fields) => {
        rows.forEach((row) => {
          if (row.postImgUrl) {
            //Renvoi le fichier s'il y en a un...
            const filename = row.postImgUrl.split("/images/")[1];
            //...suppression du fichier avec la methode fs.unlink
            fs.unlinkSync(`images/${filename}`);
          }
        });
        //...suppression des publications liées à l'user
        const query = "DELETE FROM posts WHERE user_id = ?";
        database.query(query, [user_id], (err, rows, fields) => {
          if (err) {
            res.status(400).json({
              message:
                " error : impossible de supprimer la publication de cet utilisateur",
            });
          }
          //si pas d'erreur, supprimer le user
          const query = "DELETE FROM users WHERE id = ?";
          database.query(query, [user_id], (err, rows, fields) => {
            if (err) {
              res.status(400).json({
                message: " error : impossible de supprimer cet utilisateur",
              });
            } else {
              return res
                .status(200)
                .json({ message: "Cet utilisateur est supprimé !" });
            }
          });
        });
      });
    });
  });
};

/*
 * modifier le mot de passe de l'utilisateur

 * utilisation package jsonwebtoken
 * utilisation package dotenv
 * utiliation package bcrypt
 * utilisation package password-validator
 */
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
      //si utilisateur trouvé, compare le password à la requete du frontEnd
      bcrypt
        .compare(req.body.currentPassword, results[0].password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }
          if (!passwordSchema.validate(req.body.newPassword)) {
            return res.status(400).json({
              error:
                "Nouveau mot de passe non valide :" +
                passwordSchema.validate("req.body.newPassword", { list: true }),
            });
          } else {
            bcrypt
              .hash(req.body.newPassword, 10)
              .then((newPassword) => {
                database.query(
                  "UPDATE users SET password=? WHERE id=?",
                  [newPassword, userId],
                  (err, rows, field) => {
                    if (err) {
                      return res.status(400).json({
                        error: "mot de passe utilisateur non modifié" + err,
                      });
                    }
                    return res
                      .status(201)
                      .json({ message: "mot de passe utilisateur modifié !" });
                  }
                );
              })
              .catch((error) => res.status(501).json({ error }));
          }
        })
        .catch((error) => res.status(501).json({ error }));
    }
  );
};
