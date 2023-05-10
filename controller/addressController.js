const client = require("../server");

//////////////////////////  Get  //////////////////////////
exports.getAddress = (req,res) => {
    client.query("SELECT * from address WHERE id_place = $1", [req.params.id], (err, result) => {
        if(!err){
            res.send(result.rows);
        } else{
            return res.status(404).json({ 
                message: "Impossible de trouver le restaurant associé au lieu." ,
                error: err
            });
        }
    });
}

exports.getAllAddress = (req,res) => {
    client.query("SELECT * from address", (err, result) => {
        if(!err){
            res.send(result.rows);
        } else{
            return res.status(404).json({ 
                message: "Impossible de trouver les restaurants." ,
                error: err
            });
        }
    });
}



//////////////////////////  Post  //////////////////////////
exports.addAddress = (req,res) => {
    client.query("INSERT INTO address(id,address,code_postal,id_place) Values ($1,$2,$3,$4)", 
    [req.body.id,req.body.address,req.body.code_postal,req.body.id_place], (err, result) => {
        if(!err){
            res.status(201).json({
                message: "Adresse ajoutée avec succès.",
            });
        } else{
            console.log(err);
            return res.status(404).json({ 
                message: "L'adresse n'a pas pu être ajoutée." ,
                error: err
            });
        }
    })
}

//////////////////////////  Update  //////////////////////////
exports.updateAddress = (req,res,next) => {
    client.query("UPDATE address SET address = $2, code_postal = $3 WHERE id = $1", 
    [req.body.id,req.body.address,req.body.code_postal], (err, result) => {
        if(!err){
            res.status(201).json({
                message: "Adresse modifiée avec succès.",
            });
        } else{
            console.log(err)
            return res.status(404).json({ 
                message: "L'adresse n'a pas pu être modifiée." ,
                error: err
            });
        }
    });
}


//////////////////////////  Delete  //////////////////////////
exports.deleteAddress = (req,res,next) => {
    const id = req.params.id;

    client.query("DELETE FROM address WHERE id = $1", [id], (err, result) => {
        if(!err){
            res.status(201).json({
                message: "Adresse supprimée.",
            });
        } else{
            return res.status(404).json({ 
                message: "L'adresse n'a pas pu être supprimée.",
                error: err
            });
        }
    });
}
