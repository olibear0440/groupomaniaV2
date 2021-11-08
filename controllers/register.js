const database = require("../sqlconnection");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passwordValidator = require("password-validator");

//parametre de mot de passe attendu
const newPassword = new passwordValidator();
newPassword
  .is()
  .min(8)
  .is()
  .max(20)
  .has()
  .uppercase()
  .has()
  .lowercase()
  .has()
  .digits(1)
  .has()
  .symbols(1)
  .has()
  .not()
  .spaces();

//enregistrer un utilisateur
exports.signup = (req, res, next) => {
  if (!newPassword.validate(req.body.password)) {
    return res.status(400).json({ error: "Mot de passe non valide !" });
  } else {
    bcrypt
      .hash(req.body.password, 10)
      .then((hash) => {
        const firstname = req.body.firstname;
        const lastname = req.body.lastname;
        //const picture = req.body.picture;
        const email = req.body.email;
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
  //Trouver l'utilisateur pas l'email
  database.query(
    "SELECT * FROM users WHERE email=?",
    [req.body.email],
    (err, results, fields) => {
      if (err) return res.status(500).json({ error: "Erreur systeme !" });
      if (results.length !== 1) {
        return res.status(401).json({ error: "Identification incorrecte !" });
      }
      bcrypt.compare(req.body.password, results[0].password, (err, valid) => {
        if (err) {
          return res.status(502).json({ error: "Erreur !" });
        }
        if (!valid) {
          return res.status(402).json({ error: "Erreur d'identification !" });
        } else {
          const token = jwt.sign(
            { userId: results[0].id },
            "RANDOM_TOKEN_SECRET",
            {
              expiresIn: "24h",
            }
          );
          /*database.query("update users set token = ? where id = ?  ", [
            token,
            results[0].id,
          ]);*/
          const query =
            "update users set Token = '" +
            token +
            "' where id = " +
            results[0].id;
          database.query(query);
          results[0].token = token;
          return res.status(200).json(results[0]);
        }
      });
    }
  );
};
