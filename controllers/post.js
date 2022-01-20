const database = require("../sqlconnection");
const fs = require("fs");
//import package de token
const jwt = require("jsonwebtoken");

//Afficher tt les posts
exports.getPosts = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const userId = jwt.decode(token, process.env.JWT_KEY).userId;
  database.query(
    "SELECT a.*, b.firstname, b.lastname , b.email as usersEmail, ifnull(c.comCount, 0) as comCount, (d.id is not null) as userLike, ifnull(e.likeCount, 0) as likeCount " +
      "FROM posts a " +
      "INNER JOIN users b ON a.user_id = b.id " +
      "LEFT OUTER JOIN (SELECT post_id, COUNT(id) as comCount FROM comments GROUP BY post_id) c ON a.id = c.post_id " +
      "LEFT OUTER JOIN likes d ON a.id = d.post_id AND d.user_id = " +
      userId +
      " " +
      "LEFT OUTER JOIN (SELECT post_id, COUNT(id) as likeCount FROM likes GROUP BY post_id) e ON a.id = e.post_id " +
      "ORDER BY a.postDate DESC ",
    (err, rows, fields) => {
      if (!err) res.send(rows);
      else {
        return res
          .status(400)
          .json({ error: "impossible d'afficher tous les post !" + err });
      }
    }
  );
};

//afficher un post avec id
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
        return res
          .status(400)
          .json({ message: " error : impossible d'afficher ce post" });
    }
  );
};

//creer et enregistrer un post
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
        message: "Post créé dans la base de donnée",
      });
    else {
      return res.status(401).json({ message: "error: " + err });
    }
  });
};

//supprimer les likes, les commentaires et le post ( + fichier)
exports.deletePost = (req, res, next) => {
  //recuperer le parametre id
  const urlPostId = req.params.id;
  //supprimer les comments et likes en joignant les tables respectives
  const query =
    "DELETE likes, comments " +
    "FROM likes " +
    "INNER JOIN comments " +
    "ON comments.post_id = likes.post_id " +
    "WHERE likes.post_id = " +
    urlPostId;
  database.query(query, null, (err, results, fields) => {
    if (err) {
      return res.status(400).json({
        message:
          " error : impossible de supprimer les likes et les commentaires",
      });
    }
    //si pas d'erreur selectionner le post par l'id...
    else {
      database.query(
        "SELECT * FROM posts WHERE id = ?",
        [req.params.id],
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
          //...puis suppression du post
          database.query(
            "DELETE FROM posts WHERE id = ?",
            [req.params.id],
            (err, rows, fields) => {
              if (!err) {
                res.send("Post supprimé !");
              } else {
                return res.status(400).json({
                  message: " error : impossible de supprimer le post",
                });
              }
            }
          );
        }
      );
    }
  });
};

//fonction de like et unlike d'un post
exports.postLike = (req, res, next) => {
  const urlPostId = req.params.id;
  const token = req.headers.authorization.split(" ")[1];
  const userId = jwt.decode(token, process.env.JWT_KEY).userId;

  //Recuperer le like correspondant à l'user et au post
  const query =
    "SELECT * from likes WHERE post_id = " +
    urlPostId +
    " AND  user_Id = " +
    userId;
  database.query(query, null, (err, results, fields) => {
    if (err) return res.status(401).json({ message: "error: " + err });

    //S'il n'ya pas de like correspondant au user et au post...
    if (results.length == 0) {
      //...Alors ajouter un like
      const query =
        "INSERT INTO likes (post_id, user_id) " +
        "SELECT " +
        urlPostId +
        ", " +
        userId;
      database.query(query, null, (err, results, fields) => {
        if (!err) res.send("post liké");
        else return res.status(400).json({ message: "post non liké" });
      });
    } else {
      //...Sinon retiré le like déjà présent
      const query =
        "DELETE from likes WHERE post_id = " +
        urlPostId +
        " AND user_id = " +
        userId;
      database.query(query, null, (err, results, fields) => {
        if (!err) res.send("like retiré");
        else return res.status(400).json({ message: "post toujours liké" });
      });
    }
  });
};
