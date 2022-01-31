//import package de securité pour la validation du password
const passwordValidator = require("password-validator");

//parametre de mot de passe attendu
const passwordSchema = new passwordValidator();
passwordSchema
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

module.exports = passwordSchema;
