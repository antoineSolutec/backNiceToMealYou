const client = require("../server");

//////////////////////////  Get  //////////////////////////
exports.getAllLignes = (req,res) => {
    client.query("SELECT * from ligne", (err, result) => {
        if(!err){
            res.send(result.rows);
        } else{
            return res.status(404).json({ 
                message: "Impossible de trouver les lignes." ,
                error: err
            });
        }
    });
}

//////////////////////////  Post  //////////////////////////
exports.addLigne = (req,res) => {
    client.query("INSERT INTO ligne(name) Values ($1)", 
    [req.body.name], (err, result) => {
        if(!err){
            res.status(201).json({
                message: "Station ajoutée avec succès.",
            });
        } else{
            console.log(err);
            return res.status(404).json({
                message: "Station n'a pas pu être ajoutée." ,
                error: err
            });
        }
    })
}