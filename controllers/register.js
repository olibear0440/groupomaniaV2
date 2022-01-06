//import base de donnée
const database = require("../sqlconnection");

//import variable d'environnement
require("dotenv").config();

//import package de cryptage mot de passe
const bcrypt = require("bcrypt");

//import package de token
const jwt = require("jsonwebtoken");

//import package de securité pour la validation du password
const passwordValidator = require("password-validator");

//parametre de mot de passe attendu
const newPassword = new passwordValidator();
newPassword
  .is()
  .min(8)
  .is()
  .max(50)
  .has()
  .uppercase(1)
  .has()
  .lowercase(1)
  .has()
  .digits(1)
  .has()
  .symbols(1)
  .has()
  .not()
  .spaces();

//enregistrer un utilisateur
exports.signup = (req, res, next) => {
  //condition de verification du password
  if (!newPassword.validate(req.body.password)) {
    return res.status(400).json({
      error:
        "Mot de passe non valide :" +
        newPassword.validate("req.body.password", { list: true }),
    });
  } else {
    //chiffrement du mot de passe avec bcrypt
    bcrypt
      .hash(req.body.password, 10)
      .then((hash) => {
        //infos a enregistré dans la base de donnée
        const firstname = req.body.firstname;
        const lastname = req.body.lastname;
        const email = req.body.email;
        const password = hash;
        const userRole = 0;
        //creer l'utilisateur
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

//login d'un utilisateur existant
exports.login = (req, res, next) => {
  //selection de l'utilisateur pas l'email
  database.query(
    "SELECT * FROM users WHERE email=?",
    [req.body.email],
    (err, results, fields) => {
      if (err) return res.status(500).json({ error: "Erreur systeme !" });
      //Si le resultat est null ou supérieur à 1 retour de la bdd
      if (results.length !== 1) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      //Si l'email est présent on passe à la verification du password
      bcrypt
        .compare(req.body.password, results[0].password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }
          //Si password reconnu, on prépare les infos de l'utilisateur et creer le token
          let firstname = results[0].firstname;
          let lastname = results[0].lastname;
          let email = results[0].email;
          let userRole = results[0].userRole;
          //creation du token...
          let token = jwt.sign({ userId: results[0].id }, process.env.JWT_KEY, {
            expiresIn: "24h",
          });
          //...envoi du token dans la base de donnée
          const query =
            "update users set Token = '" +
            token +
            "' where id = " +
            results[0].id;
          database.query(query);
          //Envoi des infos de l'utilisateur avec le token
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
