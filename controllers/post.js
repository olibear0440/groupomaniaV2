const database = require("../sqlconnection");
const fs = require("fs");



//Afficher les posts
exports.getPosts = (req, res, next) => {
  database.query(
    "SELECT a.*, b.firstname, b.lastname , b.email as usersEmail FROM posts a INNER JOIN users b ON a.user_id = b.id ORDER BY a.postDate DESC",
    (err, rows, fields) => {
      console.log(rows);
      if (!err) res.send(rows);
      else {
        return res
          .status(400)
          .json({ error: "impossible d'afficher tous les post !" });
      }
    }
  );
};

//afficher un post avec id
exports.getOnePost = (req, res, next) => {
  database.query(
    "SELECT a.*, b.firstname, b.lastname, b.email as usersEmail FROM posts a INNER JOIN users b ON a.user_id = b.id WHERE a.id = ? ORDER BY a.postDate DESC",
    [req.params.id],
    (err, rows, fields) => {
      if (!err) res.send(rows);
      //console.log(err);
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
  //console.log(req);
  console.log("req.file===================================> ", req.file);
  if(req.file)
  {
    postImgUrl = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;
    //postImgUrl = req.file.filename;
  }
  const postArray = [postTitre, postImgUrl, postDescription, token];
  console.log(postArray);
  const query = "INSERT INTO posts (postTitre, postImgUrl, postDescription, postDate, user_id) " +
    "SELECT ?, ?, ?, NOW(), id FROM users WHERE token=?";

    database.query(query,
    postArray,
    (err, rows, fields) => {
      if (!err)
        return res.status(201).json({
          message: "Post créé dans la base de donnée",
        });
      else {
        return res.status(401).json({ message: "error: " + err });
      }
    }
  );
};

exports.deletePost = (req, res, next) => {
  //console.log(req)
  //recuperer le nom du fichier image de la bdd
  database.query(
    "SELECT * FROM posts WHERE id = ?",
    [req.params.id],
    (err, rows, fields) => {
      //console.log("resultat de rows[0]=>", rows[0])
      //console.log("resultat de rows[0].postImgUrl=>", rows[0].postImgUrl)
      if (rows[0].postImgUrl) {
        const filename = rows[0].postImgUrl.split("/images/")[1];
        //console.log(filename);
        //suppression du fichier avec fs.unlink
        fs.unlink(`images/${filename}`, () => {
          //suppression du fichier de la bdd
          database.query(
            "DELETE FROM posts WHERE id = ?",
            [req.params.id],
            (err, rows, fields) => {
              if (!err) res.send("Post supprimé !");
              else
                return res.status(400).json({
                  message: " error : impossible de supprimer le post",
                });
            }
          );
        });
      } else {
        return res.send(500).json({ error });
      }
    }
  );
};
