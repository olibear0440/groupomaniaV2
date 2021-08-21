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
  if (newPassword.validate(req.body.password)) {
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
      .catch((error) => res.status(500).json({ error }));
  } else {
    throw "Le mot de passe doit contenir entre 8 et 20 caractères dont une majuscule, une minuscule, un chiffre et symbole";
  }
};

//connecter un utilisateur existant
exports.login = (req, res, next) => {
  //Trouver l'utilisateur pas l'email
  database.query(
    "SELECT * FROM users WHERE email=?",
    [req.body.email],
    (err, results, fields) => {
      if (!err) res.send(results);
      else {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      bcrypt
        .compare(req.body.password, results.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }
          //Si compare ok renvoi id et le token
          res.status(200).json({
            userId: results.id,
            token: jwt.sign({ userId: results.id }, "RANDOM_TOKEN_SECRET", {
              expireIn: "24h",
            }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    }
  );
};
