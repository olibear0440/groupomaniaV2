const database = require("../sqlconnection");

/*
  Renvoi les commentaires d'une publication
*/
exports.getPostComments = (req, res, next) => {
  database.query(
    "SELECT a.*, b.lastname, b.email " +
      "FROM comments a INNER JOIN users b ON a.user_id = b.id " +
      "WHERE post_id = ? ORDER BY a.commentDate DESC",
    [req.params.post_id],
    (err, rows, fields) => {
      if (!err) res.send(rows);
      else
        return res
          .status(400)
          .json({ error: "Impossible d'afficher tous les commentaires !" });
    }
  );
};

/*
  Creer et enregistrer un commentaire
*/
exports.createComment = (req, res, next) => {
  const commentText = req.body.commentText;
  const post_id = req.body.post_id;
  const token = req.headers.authorization.split(" ")[1];
  const commentArray = [commentText, post_id, token];
  const query =
    "INSERT INTO comments (commentText, commentDate, post_id, user_id)" +
    "SELECT ?, NOW(), ?, id FROM users WHERE token = ?";
  database.query(query, commentArray, (err, rows, fields) => {
    if (!err)
      return res.status(201).json({
        message: "commentaire enregistré !",
      });
    else {
      return res.status(401).json({ message: "error:  " + err });
    }
  });
};

/*
  Supprimer un commentaire
*/
exports.deleteComments = (req, res, next) => {
  database.query(
    "DELETE FROM comments WHERE id = ?",
    [req.params.id],
    (err, rows, fields) => {
      if (!err)
        return res.status(201).json({
          message: "commentaire supprimé !",
        });
      else
        return res.status(400).json({
          message: " error : impossible de supprimer le commentaire !",
        });
    }
  );
};
