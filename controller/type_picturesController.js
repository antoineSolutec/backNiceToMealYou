const client = require("../server");

//////////////////////////  Get  //////////////////////////
exports.getTypePictures = (req,res) => {
    client.query("SELECT * from type_pictures WHERE type = $1", [req.params.type], (err, result) => {
        if(!err){
            res.send(result.rows);
        } else{
            return res.status(404).json({ 
                message: "Impossible de trouver les images associée au type." ,
                error: err
            });
        }
    });
}

exports.getAllTypePictures = (req,res) => {
    client.query("SELECT * from type_pictures", (err, result) => {
        if(!err){
            res.send(result.rows);
        } else{
            return res.status(404).json({ 
                message: "Impossible de trouver les images des types." ,
                error: err
            });
        }
    });
}

//////////////////////////  Post  //////////////////////////
exports.addPictures = (req,res) => {
    client.query("INSERT INTO type_pictures(type,src) Values ($1,$2)", 
    [req.body.type,req.body.src], (err, result) => {
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
