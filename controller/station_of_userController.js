const client = require("../server");

//////////////////////////  Get  //////////////////////////
exports.getStationsOfUser = (req,res) => {
    client.query("SELECT * from station _of_user WHERE name_station = $1", [req.params.name] , (err, result) => {
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
exports.addStationOfUser = (req,res) => {
    client.query("INSERT INTO station_of_user(id,name_station,id_user) Values ($1,$2,$3)", 
    [req.body.id,req.body.name_station,req.body.id_user], (err, result) => {
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

//////////////////////////  Delete  //////////////////////////
exports.deleteStationOfUser = (req,res,next) => {
    const id = req.params.id;

    client.query("DELETE FROM station_of_user WHERE id = $1", [id], (err, result) => {
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
