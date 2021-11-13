const database = require("../sqlconnection");
const fs = require("fs");

//Afficher les posts
exports.getPosts = (req, res, next) => {
  database.query(
    "SELECT a.*, b.firstname, b.lastname FROM posts a INNER JOIN users b ON a.user_id = b.id ORDER BY a.postDate DESC",
    (err, rows, fields) => {
      console.log(rows);
      if (!err) res.send(rows);
      else console.log(err);
    }
  );
};

//afficher un post avec id
exports.getOnePost = (req, res, next) => {
  database.query(
    "SELECT a.*, b.firstname, b.lastname FROM posts a INNER JOIN users b ON a.user_id = b.id WHERE a.id = ? ORDER BY a.postDate DESC",
    [req.params.id],
    (err, rows, fields) => {
      if (!err) res.send(rows);
      else console.log(err);
    }
  );
};

//creer et enregistrer un post
exports.createPost = (req, res, next) => {
  const postTitre = req.body.postTitre;
  const postImgUrl = `${req.protocol}://${req.get("host")}/images/${
    req.file.filename
  }`;
  const postDescription = req.body.postDescription;
  const postDate = req.body.postDate;
  const user_id = req.body.user_id;
  const isCensored = req.body.isCensored;
  const postArray = [
    postTitre,
    postImgUrl,
    postDescription,
    postDate,
    user_id,
    isCensored,
  ];
  database.query(
    "INSERT INTO posts (postTitre, postImgUrl, postDescription, postDate, user_id, isCensored) VALUES (?,?,?,'0000-00-00',?,?)",
    postArray,
    (err, rows, fields) => {
      if (!err)
        return res.status(201).json({
          message: "Post créé dans la base de donnée",
          contenu: rows,
          rendu: req.body,
        });
      else {
        return res.status(401).json({ message: "error" });
      }
    }
  );
};
