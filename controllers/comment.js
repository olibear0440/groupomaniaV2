const database = require("../sqlconnection");

//afficher les commentaires d'un post
exports.getComments = (req, res, next) => {
  database.query(
    "SELECT a.*, b.lastname, b.email FROM comments a INNER JOIN users b ON a.user_id = b.id WHERE post_id ORDER BY a.commentDate DESC",
    (err, rows, fields) => {
      //console.log(rows)
      if (!err) res.send(rows);
      else 
      //console.log(err);
      return res
          .status(400)
          .json({ error: "impossible d'afficher tous les commentaires !" })
    }
  );
};

//creer et enregistrer un commentaire
exports.createComment = (req, res, next) => {
  const commentText = req.body.commentText;
  const commentDate = req.body.commentDate;
  const user_id = req.body.user_id;
  const post_id = req.body.post_id;
  const commentArray = [commentText, commentDate, user_id, post_id];
  database.query(
    "INSERT INTO comments (commentText, commentDate, user_id, post_id) VALUES (?,'0000-00-00',?,?)",
    commentArray,
    (err, rows, fields) => {
      if (!err)
        //res.send(rows);
        return res.status(201).json({
          message: "commentaire enregistré dans la base de donnée",
          contenu: rows,
          rendu: req.body,
        });
      else {
        return res.status(401).json({ message: "error" });
      }
    }
  );
};

exports.deleteComments = (req, res, next) => {
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
