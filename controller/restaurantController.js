const client = require("../server");
let axios = require("axios");

exports.getTypes = (req,res) => {
    client.query("SELECT column_name,data_type FROM information_schema.columns WHERE table_name = 'restaurants';", (err, result) => {
        if(!err){
            res.send(result.rows);
        } else{
            console.log(err);
            return res.status(404).json({ 
                error: err
            });
        }
    });
}


//////////////////////////  Get  //////////////////////////
exports.getRestaurantById = (req,res) => {
    client.query("SELECT * from restaurant WHERE id = $1", [req.params.id], (err, result) => {
        if(!err){
            res.send(result.rows[0]);
        } else{
            console.log(err);
            return res.status(404).json({ 
                message: "Impossible de trouver le restaurant." ,
                error: err
            });
        }
    });
}
exports.getBestRestaurants = (req,res) => {
    const request = JSON.parse(req.params.params);
    const query = "SELECT * from restaurant " + " ORDER BY " + request.type_note + " DESC limit 5";
    client.query(query, (err, result) => {
        if(!err){
            res.send(result.rows);
        } else{
            console.log(err);
            return res.status(404).json({ 
                message: "Impossible de trouver les restaurants." ,
                error: err
            });
        }
    });
}
exports.getRestaurantByNameAndAddress = (req,res) => {
    const params = JSON.parse(req.params.params);
    client.query("SELECT * from restaurant WHERE name = $1 AND address = $2", [params.name, params.address], (err, result) => {
        if(!err){
            res.send(result.rows);
        } else{
            console.log(err);
            return res.status(404).json({ 
                message: "Impossible de trouver les restaurants." ,
                error: err
            });
        }
    });
}
exports.getAllRestaurants = (req,res) => {
    client.query("SELECT * from restaurant", (err, result) => {
        if(!err){
            res.send(result.rows);
        } else{
            console.log(err);
            return res.status(404).json({ 
                message: "Impossible de trouver les restaurants." ,
                error: err
            });
        }
    });
}
exports.getPlaceDetail = (req,res) => {
    const url = 'https://maps.googleapis.com/maps/api/place/details/json?place_id=' + req.params.id + '&key=AIzaSyB0Z20AZ97BfKKtx2qv5kFcs3vvDJeKwWI';
    
    let config = {
    method: 'get',
    url: url,
    headers: { }
    };

    axios(config)
    .then(function (response) {
        const data = response.data.result;
        const toReturn = {
            google_note: data.rating,
            total_ratings: data.user_ratings_total,
            delivery: data.delivery,
            horaires: data.opening_hours.periods,
            website: data.website,
            vegetarian: data.serves_vegetarian_food
        }
        res.send(toReturn);
    })
    .catch(function (error) {
        console.log(error);
    });
}



//////////////////////////  Post  //////////////////////////
exports.addRestaurant = (req,res) => {
    client.query("INSERT INTO restaurant(id,name,tested,category,type,link_menu,website,address,lat,lng,google_note,total_google_note,vegetarian,delivery,visible) Values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)", 
    [req.body.id,req.body.name,req.body.tested,req.body.category,req.body.type,req.body.link_menu,req.body.website,req.body.address,req.body.lat,req.body.lng,req.body.google_note,req.body.total_google_note,req.body.vegetarian,req.body.delivery,req.body.visible], (err, result) => {
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
    client.query("UPDATE restaurant SET link_menu = $4, website = $5, type = $6, category = $7, visible = $8 WHERE id = $1", 
    [req.body.id_place,req.body.link_menu,req.body.website,req.body.type,req.body.category,req.body.visible], (err, result) => {
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

    client.query("DELETE from restaurant WHERE id_place = $1", [id], (err, result) => {
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
