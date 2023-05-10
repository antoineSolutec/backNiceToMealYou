const client = require("../server");

//////////////////////////  Get  //////////////////////////
exports.getRestaurantById = (req,res) => {
    client.query("SELECT * from restaurants WHERE id = $1", [req.params.id], (err, result) => {
        if(!err){
            res.send(result.rows);
        } else{
            return res.status(404).json({ 
                message: "Impossible de trouver le restaurant." ,
                error: err
            });
        }
    });
}
exports.getRestaurantsByType = (req,res) => {
    client.query("SELECT * from restaurants WHERE type = $1", [req.params.type], (err, result) => {
        if(!err){
            res.send(result.rows);
        } else{
            return res.status(404).json({ 
                message: "Impossible de trouver le restaurant." ,
                error: err
            });
        }
    });
}
exports.getRestaurantsByArrondissement = (req,res) => {
    client.query("SELECT * from restaurants WHERE arrondissement = $1", [req.params.arrondissement], (err, result) => {
        if(!err){
            res.send(result.rows);
        } else{
            return res.status(404).json({ 
                message: "Impossible de trouver le restaurant." ,
                error: err
            });
        }
    });
}
exports.getRestaurantsOfLigne = (req,res) => {
    const query = "SELECT r.id,r.name,r.facade,r.comment,r.arrondissement,r.quality_price,r.note_deco,r.note_globale,r.tested,r.quality,r.type from restaurants r INNER JOIN station_in_place s ON s.id_place = r.id INNER JOIN ligne_in_station l ON l.name_station = s.name_station WHERE l.name_ligne = $1 AND r.id != $2"
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
exports.getRestaurantsOfStation = (req,res) => {
    const query = "SELECT r.id,r.name,r.facade,r.comment,r.arrondissement,r.quality_price,r.note_deco,r.note_globale,r.tested,r.quality,r.type from restaurants r INNER JOIN station_in_place s ON s.id_place = r.id WHERE s.name_station = $1 AND r.id != $2"
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

exports.getBestRestaurants = (req,res) => {
    const request = JSON.parse(req.params.params);
    let tested = "false";
    if(request.tested)  tested = "true";
    const query = "SELECT * from restaurants WHERE tested =  " + tested + " ORDER BY " + request.type_note + " DESC limit 5";
    client.query(query, (err, result) => {
        if(!err){
            res.send(result.rows);
        } else{
            console.log(err)
            return res.status(404).json({ 
                message: "Impossible de trouver le restaurant." ,
                error: err
            });
        }
    });
}
exports.getAllRestaurants = (req,res) => {
    client.query("SELECT * from restaurants", (err, result) => {
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
exports.addRestaurant = (req,res) => {
    client.query("INSERT INTO restaurants(id,name,facade,comment,arrondissement,tested,quality,type,the_fork,note_quantity,quality_price,note_deco,note_globale,liked,price) Values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)", 
    [req.body.id,req.body.name,req.body.facade,req.body.comment,req.body.arrondissement,req.body.tested,req.body.quality,req.body.type,req.body.the_fork,req.body.note_quantity,req.body.quality_price,req.body.note_deco,req.body.note_globale,req.body.liked,req.body.price], (err, result) => {
        if(!err){
            res.status(201).json({
                message: "Restaurant ajouté avec succès.",
            });
        } else{
            console.log(err);
            return res.status(404).json({ 
                message: "Le restaurant n'a pas pu être ajouté." ,
                error: err
            });
        }
    })
}

//////////////////////////  Update  //////////////////////////
exports.updateRestaurant = (req,res,next) => {
    client.query("UPDATE restaurants SET name = $2, facade = $3, comment = $4, arrondissement = $5, quality_price = $6,note_deco = $7, note_globale = $8, tested = $9, quality = $10, type = $11, the_fork = $12, note_quantity = $13, price = $14 WHERE id = $1", 
    [req.body.id,req.body.name,req.body.facade,req.body.comment,req.body.arrondissement,req.body.quality_price,req.body.note_deco,req.body.note_globale,req.body.tested,req.body.quality, req.body.type,req.body.the_fork,req.body.note_quantity, req.body.price], (err, result) => {
        if(!err){
            res.status(201).json({
                message: "Restaurant modifié avec succès.",
            });
        } else{
            console.log(err)
            return res.status(404).json({ 
                message: "Le restaurant n'a pas pu être modifié." ,
                error: err
            });
        }
    });
}


//////////////////////////  Delete  //////////////////////////
exports.deleteRestaurant = (req,res,next) => {
    const id = req.params.id;

    client.query("DELETE FROM restaurants WHERE id = $1", [id], (err, result) => {
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
