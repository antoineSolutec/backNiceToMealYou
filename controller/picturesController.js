const client = require("../server");

//////////////////////////  Get  //////////////////////////
exports.getPicturesOfPlace = (req,res) => {
    client.query("SELECT * from pictures WHERE id_place = $1", [req.params.id], (err, result) => {
        if(!err){
            res.send(result.rows);
        } else{
            return res.status(404).json({ 
                message: "Impossible de trouver les images associé au lieu." ,
                error: err
            });
        }
    });
}

exports.getAllPicturesSource = (req,res) => {
    client.query("SELECT src from pictures", (err, result) => {
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
    client.query("INSERT INTO pictures(id,src,id_place) Values ($1,$2,$3)", 
    [req.body.id,req.body.src,req.body.id_place], (err, result) => {
        if(!err){
            res.status(201).json({
                message: "Image ajoutée avec succès.",
            });
        } else{
            console.log(err);
            return res.status(404).json({ 
                message: "L'image n'a pas pu être ajoutée." ,
                error: err
            });
        }
    })
}


//////////////////////////  Delete  //////////////////////////
exports.deletePictures = (req,res,next) => {
    const id = req.params.id;

    client.query("DELETE FROM pictures WHERE id_place = $1", [id], (err, result) => {
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
