const client = require("../server");

//////////////////////////  Get  //////////////////////////
exports.getAllStations = (req,res) => {
    client.query("SELECT * from station", (err, result) => {
        if(!err){
            res.send(result.rows);
        } else{
            return res.status(404).json({ 
                message: "Impossible de trouver les stations." ,
                error: err
            });
        }
    });
}

exports.getStationsOfLigne = (req,res) => {
    client.query("SELECT * from station WHERE name = $1", [req.params.id] , (err, result) => {
        if(!err){
            res.send(result.rows);
        } else{
            return res.status(404).json({ 
                message: "Impossible de trouver les stations." ,
                error: err
            });
        }
    });
}

//////////////////////////  Post  //////////////////////////
exports.addStation = (req,res) => {
    client.query("INSERT INTO station(name) Values ($1)", 
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
