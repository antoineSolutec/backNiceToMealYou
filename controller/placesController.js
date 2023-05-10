const client = require("../server");

//////////////////////////  Get  //////////////////////////
exports.getAllPlaces = (req,res) => {
    let places = []
    client.query("SELECT * from restaurants", (err, restaurants) => {
        places = restaurants.rows;
        if(!err){
            client.query("SELECT * from bar", (err, bars) => {
                if(!err){
                    places.push(...bars.rows)
                    res.send(places);
                } else{
                    return res.status(404).json({ 
                        message: "Impossible de trouver les lieux." ,
                        error: err
                    });
                }
            });
        } else{
            return res.status(404).json({ 
                message: "Impossible de trouver les lieux." ,
                error: err
            });
        }
    });
}

exports.getPlaceById = (req,res) => {
    client.query("SELECT * from restaurants WHERE id = $1", [req.params.id], (err, restaurants) => {
        if(!err){
            if(restaurants.rows.length === 0){
                client.query("SELECT * from bar WHERE id = $1", [req.params.id], (err, bars) => {
                    if(!err){
                        res.send(bars.rows);
                    } else{
                        console.log(err)
                        return res.status(404).json({ 
                            message: "Impossible de trouver les lieux." ,
                            error: err
                        });
                    }
                });
            } else{
                res.send(restaurants.rows);
            }
        } else{
            console.log(err)
            return res.status(404).json({ 
                message: "Impossible de trouver les lieux." ,
                error: err
            });
        }
    });
}

exports.getPlacesOfStation = (req,res) => {
    if(req.query.idPlace == null)  req.query.idPlace = ''; 
    const query = "SELECT r.id,r.name,r.facade,r.comment,r.arrondissement,r.quality_price,r.note_deco,r.note_globale,r.tested,r.quality,r.type from restaurants r INNER JOIN station_in_place s ON s.id_place = r.id WHERE s.name_station = $1 AND r.id != $2 UNION SELECT b.id,b.name,b.facade,b.comment,b.arrondissement,b.quality_price,b.note_deco,b.note_globale,b.tested,b.quality,b.type from bar b INNER JOIN station_in_place s ON s.id_place = b.id WHERE s.name_station = $1 AND b.id != $2"
    client.query(query, [req.params.station,req.query.idPlace], (err, result) => {
        if(!err){
            res.send(result.rows);
        } else{
            return res.status(403).json({ 
                message: "Impossible de trouver les lieux." ,
                error: err
            });
        }
    });
}

exports.getPlacesOfLigne = (req,res) => {
    const query = "SELECT r.id,r.name,r.facade,r.comment,r.arrondissement,r.quality_price,r.note_deco,r.note_globale,r.tested,r.quality,r.type from restaurants r INNER JOIN station_in_place s ON s.id_place = r.id INNER JOIN ligne_in_station l ON l.name_station = s.name_station WHERE l.name_ligne = $1 AND r.id != $2 UNION SELECT b.id,b.name,b.facade,b.comment,b.arrondissement,b.quality_price,b.note_deco,b.note_globale,b.tested,b.quality,b.type from bar b INNER JOIN station_in_place s ON s.id_place = b.id INNER JOIN ligne_in_station l On l.name_station = s.name_station WHERE l.name_ligne = $1 AND b.id != $2"
    client.query(query, [req.params.ligne,req.query.idPlace], (err, result) => {
        if(!err){
            res.send(result.rows);
        } else{
            console.log(err)
            return res.status(403).json({ 
                message: "Impossible de trouver les lieux." ,
                error: err
            });
        }
    });
}