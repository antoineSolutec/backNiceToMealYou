const client = require("../server");

//////////////////////////  Get  //////////////////////////
exports.getComment = (req,res) => {
    client.query("SELECT * from comment WHERE id_place = $1", [req.params.id], (err, result) => {
        if(!err){
            res.send(result.rows);
        } else{
            return res.status(404).json({ 
                message: "Impossible de trouver les commentaires associés au lieu." ,
                error: err
            });
        }
    });
}


//////////////////////////  Post  //////////////////////////
exports.addComment = (req,res) => {
    client.query("INSERT INTO comment(id,detail,positif,id_place) Values ($1,$2,$3,$4)", 
    [req.body.id,req.body.detail,req.body.positif,req.body.id_place], (err, result) => {
        if(!err){
            res.status(201).json({
                message: "Commentaire ajouté avec succès.",
            });
        } else{
            console.log(err);
            return res.status(404).json({ 
                message: "Le commentaire n'a pas pu être ajouté." ,
                error: err
            });
        }
    })
}

//////////////////////////  Update  //////////////////////////
exports.updateComment = (req,res,next) => {
    client.query("UPDATE comment SET detail = $2, positif = $3 WHERE id_place = $1", 
    [req.body.id_place,req.body.detail,req.body.positif], (err, result) => {
        if(!err){
            res.status(201).json({
                message: "Commentaire modifié avec succès.",
            });
        } else{
            return res.status(404).json({ 
                message: "Le commentaire n'a pas pu être modifié." ,
                error: err
            });
        }
    });
}


//////////////////////////  Delete  //////////////////////////
exports.deleteComment = (req,res,next) => {
    const id = req.params.id;

    client.query("DELETE FROM commentaire WHERE id = $1", [id], (err, result) => {
        if(!err){
            res.status(201).json({
                message: "Commentaire supprimé.",
            });
        } else{
            return res.status(404).json({ 
                message: "Le commentaire n'a pas pu être supprimé.",
                error: err
            });
        }
    });
}
