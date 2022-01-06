//import base de donnée
const database = require("../sqlconnection");

//import package
const jwt = require("jsonwebtoken");
//import variable d'environnement
require("dotenv").config();

// Protéger les routes et vérifier que l'utilisateur est authentifié
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    const userId = decodedToken.userId;
    // chercher si le user avec ce id et ce token existe dans la BdD
    const query =
      "SELECT * FROM users WHERE id=" + userId + " AND Token='" + token + "'";
    database.query(query, null, (err, results, fields) => {
      if (err) return res.status(500).json({ error: "Erreur systeme !" });
      if (results.length !== 1) {
        return res.status(401).json({ error: "Erreur accès!" });
      } else {
        next();
      }
    });
  } catch {
    res.status(401).json({ error: new Error("Requete invalide !") });
  }
};
