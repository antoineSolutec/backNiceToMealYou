const client = require("../server");

exports.getTypes = (req,res) => {
    client.query("SELECT column_name,data_type FROM information_schema.columns WHERE table_name = 'places_liked';", (err, result) => {
        if(!err){
            res.send(result.rows);
        } else{
            return res.status(404).json({ 
                error: err
            });
        }
    });
}


//////////////////////////  Get  //////////////////////////
exports.getLikeOfUser = (req,res) => {
    client.query("SELECT * from places_liked WHERE id_user = $1", [req.params.id], (err, result) => {
        if(!err){
            res.send(result.rows);
        } else{
            console.log(err)
            return res.status(404).json({ 
                message: "Impossible de trouver le lieu associé à l'utilisateur." ,
                error: err
            });
        }
    });
}

exports.getAllLike = (req,res) => {
    client.query("SELECT * from places_liked", (err, result) => {
        if(!err){
            res.send(result.rows);
        } else{
            console.log(err)
            return res.status(404).json({ 
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
    const infos = JSON.parse(req.query.infos);

    client.query("DELETE FROM places_liked WHERE id_place = $1 AND id_user = $2", [infos.id_place, infos.id_user], (err, result) => {
        if(!err){
            res.status(201).json({
                message: "Like supprimé.",
            });
        } else{
            console.log(err)
            return res.status(404).json({ 
                message: "Le like n'a pas pu être supprimé.",
                error: err
            });
        }
    });
}
