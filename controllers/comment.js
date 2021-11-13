const database = require("../sqlconnection");

//afficher les commentaires d'un post
exports.getComments = (req, res, next) => {
  database.query(
    "SELECT a.*, b.firstname, b.lastname FROM comments a INNER JOIN users b ON a.user_id = b.id WHERE post_id = 1 ORDER BY a.commentDate DESC",
    (err, rows, fields) => {
      if (!err) res.send(rows);
      else console.log(err);
    }
  );
};

//creer et enregistrer un commentaire
exports.createComment = (req, res, next) => {
  const commentText = req.body.commentText;
  const commentImgUrl = `${req.protocol}://${req.get("host")}/images/${
    req.file.filename
  }`;
  //const commentReply = req.body.commentReply;
  const commentDate = req.body.commentDate;
  const user_id = req.body.user_id;
  const post_id = req.body.post_id;
  //const isCensored = req.body.isCensored;
  const commentArray = [
    commentText,
    commentImgUrl,
    commentDate,
    user_id,
    post_id,
  ];
  database.query(
    "INSERT INTO comments (commentText, commentImgUrl, commentDate, user_id, post_id) VALUES (?,?,'0000-00-00',?,?)",
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
