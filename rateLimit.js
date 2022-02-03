//import rate-limit (protection force-brute)
const rateLimit = require("express-rate-limit");

//fonction de limitation de requete
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

module.exports = limiter;
