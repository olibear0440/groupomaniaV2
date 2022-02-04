const database = require("../sqlconnection");
const fs = require("fs");
const jwt = require("jsonwebtoken");

/*
  * Renvoi toutes les publications
    le nbre de commentaires et
    le nbre de j'aime associés à chaque publication

  * utilisation package jsonwebtoken
  * utilisation package dotenv
*/
exports.getPosts = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const userId = jwt.decode(token, process.env.JWT_KEY).userId;
  database.query(
    "SELECT a.*, b.firstname, b.lastname , b.email as usersEmail, ifnull(c.comCount, 0) as comCount, (d.id is not null) as userLike, ifnull(e.likeCount, 0) as likeCount " +
      "FROM posts a " +
      "INNER JOIN users b ON a.user_id = b.id " +
      "LEFT OUTER JOIN (SELECT post_id, COUNT(id) as comCount FROM comments GROUP BY post_id) c ON a.id = c.post_id " +
      "LEFT OUTER JOIN likes d ON a.id = d.post_id AND d.user_id = ? " +
      "LEFT OUTER JOIN (SELECT post_id, COUNT(id) as likeCount FROM likes GROUP BY post_id) e ON a.id = e.post_id " +
      "ORDER BY a.postDate DESC ",
    [userId],
    (err, rows, fields) => {
      if (!err) res.send(rows);
      else {
        return res.status(400).json({
          error: "impossible d'afficher toutes les publications !" + err,
        });
      }
    }
  );
};

/*
  Renvoie une publication et
  le nbre de commentaires associés à la publication
*/
exports.getOnePost = (req, res, next) => {
  database.query(
    "SELECT a.*, b.firstname, b.lastname, b.email as usersEmail, ifnull(c.comCount, 0) as comCount " +
      "FROM posts a INNER JOIN users b ON a.user_id = b.id " +
      "LEFT OUTER JOIN (SELECT post_id, COUNT(id) as comCount " +
      "FROM comments GROUP BY post_id) c ON a.id = c.post_id " +
      "WHERE a.id = ? ORDER BY a.postDate DESC",
    [req.params.id],
    (err, rows, fields) => {
      if (!err) res.send(rows);
      else
        return res.status(400).json({
          message: " error : impossible d'afficher cette publication !",
        });
    }
  );
};

/*
  creer et enregistrer une publication
*/
exports.createPost = (req, res, next) => {
  const postTitre = req.body.postTitre;
  const postDescription = req.body.postDescription;
  const token = req.headers.authorization.split(" ")[1];
  let postImgUrl = "";
  if (req.file) {
    postImgUrl = `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`;
  }
  const postArray = [postTitre, postImgUrl, postDescription, token];
  const query =
    "INSERT INTO posts (postTitre, postImgUrl, postDescription, postDate, user_id) " +
    "SELECT ?, ?, ?, NOW(), id FROM users WHERE token=?";
  database.query(query, postArray, (err, rows, fields) => {
    if (!err)
      return res.status(201).json({
        message: "Publication créé dans la base de donnée",
      });
    else {
      return res.status(401).json({ message: "error: " + err });
    }
  });
};

/*
  supprimer une publication
  les j'aime et 
  les commentaires associés
 */
exports.deletePost = (req, res, next) => {
  const urlPostId = req.params.id;
  const query =
    "DELETE likes, comments " +
    "FROM likes " +
    "INNER JOIN comments " +
    "ON comments.post_id = likes.post_id " +
    "WHERE likes.post_id = ?";
  database.query(query, [urlPostId], (err, results, fields) => {
    if (err) {
      return res.status(400).json({
        message:
          " error : impossible de supprimer les likes et les commentaires",
      });
    } else {
      database.query(
        "SELECT * FROM posts WHERE id = ?",
        [urlPostId],
        (err, rows, fields) => {
          //Verifier qu'il n'y a bien qu'un seul post (pas plus de 1 ni rien)
          if (rows.length != 1) {
            return;
          }
          //Si ok récuperer le fichier...
          if (rows[0].postImgUrl) {
            const filename = rows[0].postImgUrl.split("/images/")[1];
            //...suppression du fichier avec la methode fs.unlink
            fs.unlinkSync(`images/${filename}`);
          }
          //...puis suppression de la publication
          database.query(
            "DELETE FROM posts WHERE id = ?",
            [urlPostId],
            (err, rows, fields) => {
              if (!err) {
                return res.status(201).json({
                  message: "Publication supprimée !",
                });
              } else {
                return res.status(400).json({
                  message: " error : impossible de supprimer la publication",
                });
              }
            }
          );
        }
      );
    }
  });
};

/*
  * Implémenter et 
    retirer un j'aime sur une publication

  * utilisation package jsonwebtoken
  * utilisation package dotenv
*/
exports.postLike = (req, res, next) => {
  const urlPostId = req.params.id;
  const token = req.headers.authorization.split(" ")[1];
  const userId = jwt.decode(token, process.env.JWT_KEY).userId;
  const likeArray = [urlPostId, userId];
  //Renvoi le j'aime correspondant à l'user et à la publication
  const query = "SELECT * from likes WHERE post_id = ? AND user_Id = ?";
  database.query(query, likeArray, (err, results, fields) => {
    if (err) return res.status(401).json({ message: "error: " + err });
    //Si pas de j'aime correspondant au user et à la publication...
    if (results.length == 0) {
      //...Alors ajouter un j'aime
      const query = "INSERT INTO likes (post_id, user_id) VALUE (?, ?)";
      database.query(query, likeArray, (err, results, fields) => {
        if (!err)
          return res.status(201).json({
            message: "Vous avez aimé cette publication !",
          });
        else
          return res
            .status(400)
            .json({ message: "j'aime non effectué sur la publication" });
      });
    } else {
      //...Sinon retiré le j'aime déjà présent
      const query = "DELETE from likes WHERE post_id = ? AND user_id = ?";
      database.query(query, likeArray, (err, results, fields) => {
        if (!err)
          return res.status(201).json({
            message: "j'aime retiré de cette publication !",
          });
        else
          return res
            .status(400)
            .json({ message: "j'aime non retiré de la publication" });
      });
    }
  });
};
