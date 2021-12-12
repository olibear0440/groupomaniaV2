const database = require("../sqlconnection");

//afficher les commentaires d'un post
exports.getPostComments = (req, res, next) => {
  database.query(
    "SELECT a.*, b.lastname, b.email FROM comments a INNER JOIN users b ON a.user_id = b.id WHERE post_id = ? ORDER BY a.commentDate DESC",
    [req.params.post_id],
    (err, rows, fields) => {
      //console.log(rows)
      if (!err) res.send(rows);
      //console.log(err);
      else
        return res
          .status(400)
          .json({ error: "impossible d'afficher tous les commentaires !" });
    }
  );
};

//creer et enregistrer un commentaire
exports.createComment = (req, res, next) => {
  const commentText = req.body.commentText;
  const post_id = req.body.post_id;
  const token = req.headers.authorization.split(" ")[1];
  const commentArray = [commentText, post_id, token];

  const query =
    "INSERT INTO comments (commentText, commentDate, post_id, user_id)" +
    "SELECT '" +
    commentText +
    "', NOW(), '" +
    post_id +
    "', id FROM users WHERE token = '" +
    token +
    "'";
  //console.log(query)
  database.query(query, commentArray, (err, rows, fields) => {
    if (!err)
      return res.status(201).json({
        message: "commentaire enregistré dans la base de donnée",
      });
    else {
      return res.status(401).json({ message: "error:  " + err });
    }
  });
};

exports.deleteComments = (req, res, next) => {
  console.log(req.body);
  database.query(
    "DELETE FROM comments WHERE id = ?",
    [req.params.id],
    (err, rows, fields) => {
      if (!err) res.send("commentaire supprimé !");
      else
        return res.status(400).json({
          message: " error : impossible de supprimer le commentaire",
        });
    }
  );
};
