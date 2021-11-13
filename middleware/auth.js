//import package
const jwt = require("jsonwebtoken");
//import variable d'environnement
require('dotenv').config()

// Protéger les routes et vérifier que l'utilisateur est authentifié
module.exports = (req, res, next) => {
  
  try {
    //console.log(req.body)
    const token = req.headers.authorization.split(" ")[1];
    //console.log("resultat de req.headers.authorization sans bearer======>")
    //console.log(token)
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    //console.log("resultat de decodedToken=====================================================>")
    console.log(decodedToken)
    const userId = decodedToken.userId;
    //console.log("resultat de userId============================================================>")
    console.log(userId)
    if (req.body.userId && (req.body.userId === userId)) {
      next();
    } else {
      throw "User ID non valable !";
    }
  } catch {
    res.status(401).json({ error: new Error("Requete invalide !") });
  }
};
