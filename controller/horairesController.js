const client = require("../server");

//////////////////////////  Get  //////////////////////////
exports.getHorairesOfPlace = (req,res) => {
    client.query("SELECT * from horaires WHERE id_place = $1", [req.params.id], (err, result) => {
        if(!err){
            res.send(result.rows);
        } else{
            return res.status(404).json({ 
                message: "Impossible de trouver les horaires associés au lieu." ,
                error: err
            });
        }
    });
}

exports.getAllHoraires = (req,res) => {
    client.query("SELECT * from horaires", (err, result) => {
        if(!err){
            res.send(result.rows);
        } else{
            return res.status(404).json({ 
                message: "Impossible de trouver les horaires." ,
                error: err
            });
        }
    });
}



//////////////////////////  Post  //////////////////////////
exports.addHoraires = (req,res) => {
    client.query("INSERT INTO horaires(id,day,ouverture,fermeture_midi,ouverture_soir,fermeture,id_place) Values ($1,$2,$3,$4,$5,$6,$7)", 
    [req.body.id,req.body.day,req.body.ouverture,req.body.fermeture_midi,req.body.ouverture_soir,req.body.fermeture,req.body.id_place], (err, result) => {
        if(!err){
            res.status(201).json({
                message: "Horaires ajoutés avec succès.",
            });
        } else{
            console.log(err);
            return res.status(404).json({ 
                message: "Les horaires n'ont pas pu être ajoutés." ,
                error: err
            });
        }
    })
}

//////////////////////////  Update  //////////////////////////
exports.updateHoraires = (req,res,next) => {
    client.query("UPDATE horaires SET day = $2, ouverture = $3, fermeture_midi = $4, ouverture_soir = $5, fermeture = $6 WHERE id = $1", 
    [req.body.id_place,req.body.day,req.body.ouverture,req.body.fermeture_midi,req.body.ouverture_soir,req.body.fermeture_soir], (err, result) => {
        if(!err){
            res.status(201).json({
                message: "Horaires modifiés avec succès.",
            });
        } else{
            return res.status(404).json({ 
                message: "Les horaires n'ont pas pu être modifié." ,
                error: err
            });
        }
    });
}


//////////////////////////  Delete  //////////////////////////
exports.deleteHoraires = (req,res,next) => {
    const id = req.params.id;

    client.query("DELETE FROM horaires WHERE id = $1", [id], (err, result) => {
        if(!err){
            res.status(201).json({
                message: "Restaurant supprimé.",
            });
        } else{
            return res.status(404).json({ 
                message: "Le restaurant n'a pas pu être supprimé.",
                error: err
            });
        }
    });
}
