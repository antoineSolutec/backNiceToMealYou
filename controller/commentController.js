const client = require("../server");

exports.getTypes = (req,res) => {
    client.query("SELECT column_name,data_type FROM information_schema.columns WHERE table_name = 'comment';", (err, result) => {
        if(!err){
            res.send(result.rows);
        } else{
            return res.status(404).json({ 
                error: err
            });
        }
    });
}

//////////////////////////  Get  //////////////////////////
exports.getComment = (req,res) => {
    const params = JSON.parse(req.params.ids);
    let table = "";
    switch(params.category){
        case "":
            table = "comment";
        break;
        case "Restaurant":
            table = "restaurants_grades";
        break;
    }
    const query = "SELECT * from " +table+ " WHERE id_place = $1 AND id_user = $2";
    client.query(query, [params.id_place, params.id_user], (err, result) => {
        if(!err){
            res.send(result.rows);
        } else{
            console.log(err);
            return res.status(404).json({ 
                message: "Impossible de trouver les commentaires associés au lieu." ,
                error: err
            });
        }
    });
}
exports.getPoints = (req,res) => {
    const params = JSON.parse(req.params.ids);
    const query = "SELECT * from points WHERE id_place = $1 AND id_user = $2";
    client.query(query, [params.id_place, params.id_user], (err, result) => {
        if(!err){
            res.send(result.rows);
        } else{
            console.log(err);
            return res.status(404).json({ 
                message: "Impossible de trouver les commentaires associés au lieu." ,
                error: err
            });
        }
    });
}

exports.getAllComments = (req,res) => {
    client.query("SELECT * from comment", (err, result) => {
        if(!err){
            res.send(result.rows);
        } else{
            return res.status(404).json({ 
                message: "Impossible de trouver les commentaires" ,
                error: err
            });
        }
    });
}


//////////////////////////  Post  //////////////////////////
exports.addCommentRestaurant = (req,res) => {
    client.query("INSERT INTO restaurants_grades(comment,id_user,id_place,quantity,quality_price,service) Values ($1,$2,$3,$4,$5,$6)", 
    [req.body.comment,req.body.id_user,req.body.id_place,req.body.quantity,req.body.quality_price,req.body.service], (err, result) => {
        if(!err){
            res.status(201).json({
                message: "Notes ajoutées avec succès.",
            });
        } else{
            console.log(err);
            return res.status(404).json({ 
                message: "Les notes n'ont pas pu être ajoutées." ,
                error: err
            });
        }
    })
}

//////////////////////////  Update  //////////////////////////
exports.updateCommentRestaurant = (req,res,next) => {
    client.query("UPDATE restaurants_grades SET comment = $3, quantity = $4, quality_price = $5, service = $6 WHERE id_place = $1 AND id_user = $2", 
    [req.body.id_place,req.body.id_user, req.body.comment,req.body.quantity,req.body.quality_price,req.body.service], (err, result) => {
        if(!err){
            res.status(201).json({
                message: "Commentaire modifié avec succès.",
            });
        } else{
            console.log(err);
            return res.status(404).json({ 
                message: "Le commentaire n'a pas pu être modifié." ,
                error: err
            });
        }
    });
}


//////////////////////////  Delete  //////////////////////////
exports.deleteComment = (req,res,next) => {
    const id = req.params.id;

    client.query("DELETE FROM comment WHERE id_place = $1", [id], (err, result) => {
        if(!err){
            res.status(201).json({
                message: "Commentaire supprimé.",
            });
        } else{
            console.log(err)
            return res.status(404).json({ 
                message: "Le commentaire n'a pas pu être supprimé.",
                error: err
            });
        }
    });
}
