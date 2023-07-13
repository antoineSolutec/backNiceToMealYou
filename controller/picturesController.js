const client = require("../server");

exports.getTypes = (req,res) => {
    client.query("SELECT column_name,data_type FROM information_schema.columns WHERE table_name = 'pictures';", (err, result) => {
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
exports.getPicturesOfPlaceByUser = (req,res) => {
    const params = JSON.parse(req.params.params);
    client.query("SELECT * from picture WHERE id_place = $1 AND id_user = $2 ", [params.idPlace,params.idUser], (err, result) => {
        if(!err){
            res.send(result.rows);
        } else{
            console.log(err);
            return res.status(404).json({ 
                message: "Impossible de trouver les photos de l'utilisateur associé au lieu." ,
                error: err
            });
        }
    });
}

exports.getAllPicturesSource = (req,res) => {
    client.query("SELECT src from picture", (err, result) => {
        if(!err){
            res.send(result.rows);
        } else{
            return res.status(404).json({ 
                message: "Impossible de trouver les images." ,
                error: err
            });
        }
    });
}

exports.getAllPictures = (req,res) => {
    client.query("SELECT * from picture", (err, result) => {
        if(!err){
            res.send(result.rows);
        } else{
            return res.status(404).json({ 
                message: "Impossible de trouver les images." ,
                error: err
            });
        }
    });
}



//////////////////////////  Post  //////////////////////////
exports.addPictures = (req,res) => {
    client.query("INSERT INTO picture(id,src,id_place,id_user) Values ($1,$2,$3,$4)", 
    [req.body.id,req.body.src,req.body.id_place,req.body.id_user], (err, result) => {
        if(!err){
            res.status(201).json({
                message: "Photo ajoutée avec succès.",
            });
        } else{
            console.log(err);
            return res.status(404).json({ 
                message: "La photo n'a pas pu être ajoutée." ,
                error: err
            });
        }
    })
}


//////////////////////////  Delete  //////////////////////////
exports.deletePictures = (req,res,next) => {
    const id = req.params.id;

    client.query("DELETE from picture WHERE id = $1", [id], (err, result) => {
        if(!err){
            res.status(201).json({
                message: "Image supprimée.",
            });
        } else{
            return res.status(404).json({ 
                message: "L'image n'a pas pu être supprimée.",
                error: err
            });
        }
    });
}
