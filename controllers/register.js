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
  } else if (newPassword.validate(req.body.password)) {
    bcrypt
      .hash(req.body.password, 10)
      .then((hash) => {
        const firstname = req.body.firstname;
        const lastname = req.body.lastname;
        const email = req.body.email;
        const password = hash;
        //creer l'utilisateur
        database.query(
          "INSERT INTO users (firstname, lastname, email, password) VALUES (?,?,?,?)",
          [firstname, lastname, email, password],
          (err, rows, fields) => {
            //if (!err) res.send(rows);
            //else console.log(err);
            if (err) {
              return res.status(400).json({ error });
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
          return res.status(200).json({
            userId: results[0].id,
            firstname: results[0].firstname,
            lastname: results[0].lastname,
            userRole: results[0].userRole,
            token: jwt.sign({ userId: results[0].id }, "RANDOM_TOKEN_SECRET", {
              expiresIn: "24h",
            }),
          });
        }
      });
    }
  );
};