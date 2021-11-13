//import base de donnée
const database = require("../sqlconnection");

//import variable d'environnement
require('dotenv').config()

//import package de cryptage mot de passe
const cryptojs = require("crypto-js");
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
  //parametre de cryptage de l'email
  const emailCryptoJs = cryptojs
    .HmacSHA256(req.body.email, process.env.CRYPTO_JS)
    .toString();
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
        //const picture = req.body.picture;
        const email = emailCryptoJs;
        const password = hash;
        //creer l'utilisateur
        database.query(
          "INSERT INTO users (firstname, lastname, email, password) VALUES (?,?,?,?)",
          [firstname, lastname, email, password],
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

//connecter un utilisateur existant
exports.login = (req, res, next) => {
  //parametre de cryptage de l'email
  const emailCryptoJs = cryptojs
    .HmacSHA256(req.body.email, process.env.CRYPTO_JS)
    .toString();
  //Trouver l'utilisateur pas l'email
  database.query(
    "SELECT * FROM users WHERE email=?",
    [emailCryptoJs],
    (err, results, fields) => {
      //Si l'email crypté n'est pas reconnu
      if (err) return res.status(500).json({ error: "Erreur systeme !" });
      if (results.length !== 1) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      //Si l'email est reconnu on passe à la verification du password
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
          let token = jwt.sign(
            { userId: results[0].id },
            process.env.JWT_KEY,
            {
              expiresIn: "24h",
            }
          );
          //renvoi des infos de l'utilisateur avec le token
          res.status(200).json({
            userId: results[0].id,
            firstname: firstname,
            lastname: lastname,
            email: email,
            userRole: userRole,
            token: token,
          });
          const refToken = token;
          //console.log(configToken)
          //envoi du token dans la base de donnée
          const query =
            "update users set Token = '" +
            refToken +
            "' where id = " +
            results[0].id;
          //console.log(query)
          database.query(query);
        })
        .catch((error) => res.status(501).json({ error }));
    }
  );
};
