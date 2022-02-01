const database = require("../sqlconnection");
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passwordSchema = require("../passwordValidate");

/*
 * enregistrer un utilisateur

 * utilisation package password-validator
 * utiliation package bcrypt
 */
exports.signup = (req, res, next) => {
  if (!passwordSchema.validate(req.body.password)) {
    return res.status(400).json({
      error:
        "Mot de passe non valide :" +
        passwordSchema.validate("req.body.password", { list: true }),
    });
  } else {
    bcrypt
      .hash(req.body.password, 10)
      .then((hash) => {
        //infos a enregistré dans la base de donnée
        const firstname = req.body.firstname;
        const lastname = req.body.lastname;
        const email = req.body.email;
        const password = hash;
        const userRole = 0;
        database.query(
          "INSERT INTO users (firstname, lastname, email, password, userRole) VALUES (?,?,?,?,?)",
          [firstname, lastname, email, password, userRole],
          (err, rows, fields) => {
            if (err) {
              return res.status(400).json(err);
            }
            return res.status(201).json({ message: "Utilisateur créé !" });
          }
        );
      })
      .catch((error) => res.status(501).json({ error }));
  }
};

/*
 * login d'un utilisateur existant

 * utilisation package bcrypt
 * utilisation package jsonwebtoken
 * utilisation package dotenv
 */
exports.login = (req, res, next) => {
  database.query(
    "SELECT * FROM users WHERE email=?",
    [req.body.email],
    (err, results, fields) => {
      if (err) return res.status(500).json({ error: "Erreur systeme !" });
      //Si le resultat est null ou supérieur à 1 retour de la bdd
      if (results.length !== 1) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      bcrypt
        .compare(req.body.password, results[0].password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }
          let firstname = results[0].firstname;
          let lastname = results[0].lastname;
          let email = results[0].email;
          let userRole = results[0].userRole;
          let token = jwt.sign({ userId: results[0].id }, process.env.JWT_KEY, {
            expiresIn: "24h",
          });
          //envoi du token dans la base de donnée
          const query =
            "update users set Token = '" +
            token +
            "' where id = " +
            results[0].id;
          database.query(query);
          //Envoi des infos de l'utilisateur et du token
          res.status(200).json({
            userId: results[0].id,
            firstname: firstname,
            lastname: lastname,
            email: email,
            userRole: userRole,
            token: "Bearer " + token,
          });
        })
        .catch((error) => res.status(501).json({ error }));
    }
  );
};
