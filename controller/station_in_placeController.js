const client = require("../server");

//////////////////////////  Get  //////////////////////////
exports.getStationsOfPlace = (req,res) => {
    client.query("SELECT name_station from station_in_place WHERE id_place = $1", [req.params.id], (err, result) => {
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


//////////////////////////  Post  //////////////////////////
exports.addStationForPlace = (req,res) => {
    client.query("INSERT INTO station_in_place(id,name_station,id_place) Values ($1,$2,$3)", 
    [req.body.id,req.body.name_station,req.body.id_place], (err, result) => {
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


//////////////////////////  Delete  //////////////////////////
exports.deleteStationInPlace = (req,res,next) => {
    const id = req.params.id;

    client.query("DELETE FROM station_in_place WHERE id_place = $1", [id], (err, result) => {
        if(!err){
            res.status(201).json({
                message: "Station supprimée.",
            });
        } else{
            return res.status(404).json({ 
                message: "La station n'a pas pu être supprimée.",
                error: err
            });
        }
    });
}
