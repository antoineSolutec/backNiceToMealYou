const client = require("../server");

//////////////////////////  Get  //////////////////////////
exports.getAllBars = (req,res) => {
    client.query("SELECT * from Bar", (err, result) => {
        if(!err){
            res.send(result.rows);
        } else{
            return res.status(404).json({ 
                message: "Impossible de trouver les bars." ,
                error: err
            });
        }
    });
}

exports.getBarById = (req,res) => {
    client.query("SELECT * from Bar where id = $1", [req.params.id], (err, result) => {
        if(!err){
            res.send(result.rows);
        } else{
            return res.status(404).json({ 
                message: "Impossible de trouver le bar." ,
                error: err
            });
        }
    });
}
exports.getBarsByType = (req,res) => {
    client.query("SELECT * from Bar where type = $1", [req.params.type], (err, result) => {
        if(!err){
            res.send(result.rows);
        } else{
            return res.status(404).json({ 
                message: "Impossible de trouver les bars." ,
                error: err
            });
        }
    });
}
exports.getBarsByArrondissement = (req,res) => {
    client.query("SELECT * from Bar where arrondissement = $1", [req.params.arrondissement], (err, result) => {
        if(!err){
            res.send(result.rows);
        } else{
            return res.status(404).json({ 
                message: "Impossible de trouver les bars." ,
                error: err
            });
        }
    });
}
exports.getBarsOfStation = (req,res) => {
    const query = "SELECT b.id,b.name,b.facade,b.comment,b.arrondissement,b.quality_price,b.note_deco,b.note_globale,b.tested,b.quality,b.type from bar b INNER JOIN station_in_place s ON s.id_place = b.id WHERE s.name_station = $1 AND b.id != $2"
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
exports.getBarsOfLigne = (req,res) => {
    const query = "SELECT b.id,b.name,b.facade,b.comment,b.arrondissement,b.quality_price,b.note_deco,b.note_globale,b.tested,b.quality,b.type from bar b INNER JOIN station_in_place s ON s.id_place = b.id INNER JOIN ligne_in_station l On l.name_station = s.name_station WHERE l.name_ligne = $1 AND b.id != $2"
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

exports.getBestBars = (req,res) => {
    const request = JSON.parse(req.params.params);
    let tested = "false";
    if(request.tested)  tested = "true";
    const query = "SELECT * from bar WHERE tested =  " + tested + " ORDER BY " + request.type_note + " DESC limit 5";
    client.query(query, (err, result) => {
        if(!err){
            res.send(result.rows);
        } else{
            console.log(err);
            return res.status(404).json({ 
                message: "Impossible de trouver les bars." ,
                error: err
            });
        }
    });
}



//////////////////////////  Post  //////////////////////////
exports.addBar = (req,res) => {
    client.query("INSERT INTO Bar(id,name,facade,comment,arrondissement,quality_price,note_deco,note_globale,tested,liked,quality,type) Values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)", 
    [req.body.id,req.body.name,req.body.facade,req.body.comment,req.body.arrondissement,req.body.quality_price,req.body.note_deco,req.body.note_globale,req.body.tested,req.body.liked,req.body.quality,req.body.type], (err, result) => {
        if(!err){
            res.status(201).json({
                message: "Bar ajouté avec succès.",
            });
        } else{
            console.log(err);

            return res.status(404).json({ 
                message: "Le Bar n'a pas pu être ajouté." ,
                error: err
            });
        }
    })
}

//////////////////////////  Update  //////////////////////////
exports.updateBar = (req,res,next) => {
    client.query("UPDATE Bar SET name = $2, facade = $11, comment = $3, arrondissement = $4, quality_price = $5,note_deco = $6, note_globale = $7, tested = $8, quality = $9, type = $10   WHERE id = $1", 
    [req.body.id,req.body.name,req.body.comment,req.body.arrondissement,req.body.quality_price,req.body.note_deco,req.body.note_globale,req.body.tested,req.body.quality,req.body.type,req.body.facade], (err, result) => {
        if(!err){
            res.status(201).json({
                message: "Bar modifié avec succès.",
            });
        } else{
            console.log(err);
            return res.status(404).json({ 
                message: "Le bar n'a pas pu être modifié." ,
                error: err
            });
        }
    });
}


//////////////////////////  Delete  //////////////////////////
exports.deleteBar = (req,res,next) => {
    const id = req.params.id;

    client.query("DELETE FROM Bar WHERE id = $1", [id], (err, result) => {
        if(!err){
            res.status(201).json({
                message: "Bar supprimé.",
            });
        } else{
            return res.status(404).json({ 
                message: "Le bar n'a pas pu être supprimé.",
                error: err
            });
        }
    });
}
