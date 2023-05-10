const client = require("../server");

//////////////////////////  Get  //////////////////////////
exports.getStationsOfLigne = (req,res) => {
    client.query("SELECT name_station from ligne_in_station WHERE name_ligne = $1", [req.params.ligne], (err, result) => {
        if(!err){
            res.send(result.rows);
        } else{
            return res.status(404).json({ 
                message: "Impossible de trouver les stations associé au lieu." ,
                error: err
            });
        }
    });
}

exports.getLigneofStation = (req,res) => {
    client.query("SELECT name_ligne from ligne_in_station WHERE name_station = $1", [req.params.station], (err, result) => {
        if(!err){
            res.send(result.rows);
        } else{
            console.log(err)
            return res.status(403).json({ 
                message: "Impossible de trouver les stations associé au lieu." ,
                error: err
            });
        }
    });
}


//////////////////////////  Post  //////////////////////////
exports.addStationForLigne = (req,res) => {
    client.query("INSERT INTO ligne_in_station(name_ligne,name_station) Values ($1,$2)", 
    [req.body.name_ligne,req.body.name_station], (err, result) => {
        if(!err){
            res.status(201).json({
                message: "Station ajoutée avec succès.",
            });
        } else{
            console.log(err);
            return res.status(404).json({ 
                message: "La station n'a pas pu être ajoutée." ,
                error: err
            });
        }
    })
}
