const client = require("../server");

//////////////////////////  Get  //////////////////////////
exports.getLikeOfUser = (req,res) => {
    client.query("SELECT * from places_liked WHERE id_user = $1", [req.params.id], (err, result) => {
        if(!err){
            res.send(result.rows);
        } else{
            return res.status(404).json({ 
                message: "Impossible de trouver le lieu associé à l'utilisateur." ,
                error: err
            });
        }
    });
}


//////////////////////////  Post  //////////////////////////
exports.addLike = (req,res) => {
    client.query("INSERT INTO places_liked(id_user,id_place,id) Values ($1,$2,$3)", 
    [req.body.id_user,req.body.id_place,req.body.id], (err, result) => {
        if(!err){
            res.status(201).json({
                message: "Like ajouté avec succès.",
            });
        } else{
            console.log(err);
            return res.status(404).json({ 
                message: "Le like n'a pas pu être ajouté." ,
                error: err
            });
        }
    })
}


//////////////////////////  Delete  //////////////////////////
exports.deleteLike = (req,res,next) => {
    const id = req.params.id;

    client.query("DELETE FROM places_liked WHERE id = $1", [id], (err, result) => {
        if(!err){
            res.status(201).json({
                message: "Like supprimé.",
            });
        } else{
            return res.status(404).json({ 
                message: "Le like n'a pas pu être supprimé.",
                error: err
            });
        }
    });
}
