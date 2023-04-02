const client = require("../server");

//////////////////////////  Get  //////////////////////////
exports.getFavoritesTypeOfUser = (req,res) => {
    client.query("SELECT * from favorite_type WHERE id_user = $1", [req.params.id], (err, result) => {
        if(!err){
            res.send(result.rows);
        } else{
            return res.status(404).json({ 
                message: "Impossible de trouver le type favori associé à cet utilisateur." ,
                error: err
            });
        }
    });
}

//////////////////////////  Post  //////////////////////////
exports.addFavoriteType = (req,res) => {
    client.query("INSERT INTO favorite_type(id,place,type,id_user) Values ($1,$2,$3,$4)", 
    [req.body.id,req.body.place,req.body.type,req.body.id_user], (err, result) => {
        if(!err){
            res.status(201).json({
                message: "Type ajouté avec succès.",
            });
        } else{
            console.log(err);
            return res.status(404).json({ 
                message: "Le type n'a pas pu être ajouté." ,
                error: err
            });
        }
    })
}

//////////////////////////  Update  //////////////////////////
exports.updateFavoriteType = (req,res,next) => {
    client.query("UPDATE favorite_type SET type = $2 WHERE id_place = $1", 
    [req.body.id,req.body.type], (err, result) => {
        if(!err){
            res.status(201).json({
                message: "Type modifié avec succès.",
            });
        } else{
            return res.status(404).json({ 
                message: "Le type n'a pas pu être modifié." ,
                error: err
            });
        }
    });
}


//////////////////////////  Delete  //////////////////////////
exports.deleteFavoriteType = (req,res,next) => {
    const id = req.params.id;

    client.query("DELETE FROM favorite_type WHERE id = $1", [id], (err, result) => {
        if(!err){
            res.status(201).json({
                message: "Type supprimé.",
            });
        } else{
            return res.status(404).json({ 
                message: "Le type n'a pas pu être supprimé.",
                error: err
            });
        }
    });
}
