const client = require("../server");

exports.getPlaceInStationOfUser = (req,res) => {
    const query = "WITH stations AS(SELECT name_station FROM station_of_user as s WHERE s.id_user = $1),places as (SELECT DISTINCT id_place FROM station_in_place, stations WHERE station_in_place.name_station = stations.name_station),liked as (SELECT id_place FROM places_liked WHERE id_user = $1),filtered as (SELECT DISTINCT places.id_place FROM liked, places WHERE liked.id_place != places.id_place)SELECT * from restaurants, filtered WHERE restaurants.id = filtered.id_place ORDER BY note_globale DESC limit 5"
    client.query(query, [req.params.id], (err, result) => {
        if(!err){
            res.send(result.rows);
        } else{
            console.log(err);

            return res.status(404).json({ 
                message: "Les lieux n'ont pas été trouvés." ,
                error: err
            });
        }
    });
}

exports.getRestaurantsOfMutlipleStations = (req,res) => {
    let stationsNames = [];
    req.body.map(item => {
        stationsNames.push(item.name);
    })
    let query = "WITH places_id AS (SELECT DISTINCT id_place FROM station_in_place WHERE";
    for(let index = 0; index < stationsNames.length; index++){
        if(index === 0) query += " name_station = '" + stationsNames[index] +"'"
        else{
            query += " OR name_station = '" + stationsNames[index] +"'"
        }
    }
    query += ") SELECT restaurants.* FROM places_id,restaurants WHERE places_id.id_place = restaurants.id";
    
    client.query(query, (err, result) => {
        if(!err){
            res.send(result.rows);
        } else{
            console.log(err);

            return res.status(404).json({ 
                message: "Les lieux n'ont pas été trouvés." ,
                error: err
            });
        }
    });
}

exports.getRestaurantsOfMutlipleLignes = (req,res) => {
    let lignes = [];
    req.body.map(item => {
        lignes.push(item.name_ligne);
    })
    let query = "WITH stations AS (SELECT DISTINCT name_station FROM ligne_in_station WHERE";
    for(let index = 0; index < lignes.length; index++){
        if(index === 0) query += " name_ligne = '" + lignes[index] +"'"
        else{
            query += " OR name_ligne = '" + lignes[index] +"'"
        }
    }
    query += "), places_id AS (SELECT DISTINCT station_in_place.id_place FROM station_in_place,stations WHERE stations.name_station = station_in_place.name_station) SELECT restaurants.* FROM places_id,restaurants WHERE places_id.id_place = restaurants.id";
    
    client.query(query, (err, result) => {
        if(!err){
            res.send(result.rows);
        } else{
            console.log(err);

            return res.status(404).json({ 
                message: "Les lieux n'ont pas été trouvés." ,
                error: err
            });
        }
    });
}

exports.getBarsOfMutlipleLignes = (req,res) => {
    let lignes = [];
    req.body.map(item => {
        lignes.push(item.name);
    })
    let query = "WITH stations AS (SELECT DISTINCT name_station FROM ligne_in_station WHERE";
    for(let index = 0; index < lignes.length; index++){
        if(index === 0) query += " name_ligne = '" + lignes[index] +"'"
        else{
            query += " OR name_ligne = '" + lignes[index] +"'"
        }
    }
    query += "), places_id AS (SELECT DISTINCT station_in_place.id_place FROM station_in_place,stations WHERE stations.name_station = station_in_place.name_station) SELECT bar.* FROM places_id,bar WHERE places_id.id_place = bar.id";
    
    client.query(query, (err, result) => {
        if(!err){
            res.send(result.rows);
        } else{
            console.log(err);

            return res.status(404).json({ 
                message: "Les lieux n'ont pas été trouvés." ,
                error: err
            });
        }
    });
}

exports.getBarsOfMutlipleStations = (req,res) => {
    let stationsNames = [];
    req.body.map(item => {
        stationsNames.push(item.name);
    })
    let query = "WITH places_id AS (SELECT DISTINCT id_place FROM station_in_place WHERE";
    for(let index = 0; index < stationsNames.length; index++){
        if(index === 0) query += " name_station = '" + stationsNames[index] +"'"
        else{
            query += " OR name_station = '" + stationsNames[index] +"'"
        }
    }
    query += ") SELECT bar.* FROM places_id,bar WHERE places_id.id_place = bar.id";
    
    client.query(query, (err, result) => {
        if(!err){
            res.send(result.rows);
        } else{
            console.log(err);

            return res.status(404).json({ 
                message: "Les lieux n'ont pas été trouvés." ,
                error: err
            });
        }
    });
}

exports.getRestaurantsOfStations = (req,res) => {
    const query = "WITH places_id AS(SELECT id_place FROM station_in_place WHERE name_station = $1)SELECT restaurants.* FROM places_id,restaurants WHERE places_id.id_place = restaurants.id"
    client.query(query, [req.params.id], (err, result) => {
        if(!err){
            res.send(result.rows);
        } else{
            console.log(err);
            return res.status(404).json({ 
                message: "Les restaurants n'ont pas été trouvés." ,
                error: err
            });
        }
    });
}

exports.getBarsOfStations = (req,res) => {
    const query = "WITH places_id AS(SELECT id_place FROM station_in_place WHERE name_station = $1)SELECT bar.* FROM places_id,bar WHERE places_id.id_place = bar.id"
    client.query(query, [req.params.id], (err, result) => {
        if(!err){
            res.send(result.rows);
        } else{
            console.log(err);
            return res.status(404).json({ 
                message: "Les bars n'ont pas été trouvés." ,
                error: err
            });
        }
    });
}

exports.getRestaurantsOfLigne = (req,res) => {
    const query = "WITH stations AS(SELECT name_station FROM ligne_in_station WHERE name_ligne = $1),places_id AS(SELECT id_place FROM station_in_place,stations WHERE station_in_place.name_station = stations.name_station)SELECT restaurants.* FROM places_id,restaurants WHERE places_id.id_place = restaurants.id"
    client.query(query, [req.params.id], (err, result) => {
        if(!err){
            res.send(result.rows);
        } else{
            console.log(err);
            return res.status(404).json({ 
                message: "Les restaurants n'ont pas été trouvés." ,
                error: err
            });
        }
    });
}

exports.getBarsOfLigne = (req,res) => {
    const query = "WITH stations AS(SELECT name_station FROM ligne_in_station WHERE name_ligne = $1),places_id AS(SELECT id_place FROM station_in_place,stations WHERE station_in_place.name_station = stations.name_station)SELECT restaurants.* FROM places_id,bar WHERE places_id.id_place = bar.id"
    client.query(query, [req.params.id], (err, result) => {
        if(!err){
            res.send(result.rows);
        } else{
            console.log(err);
            return res.status(404).json({ 
                message: "Les bars n'ont pas été trouvés." ,
                error: err
            });
        }
    });
}

exports.getLignesOfPlace = (req,res) => {
    const query = "WITH stations AS(SELECT name_station FROM station_in_place WHERE id_place = $1)SELECT ligne_in_station.name_ligne FROM ligne_in_station,stations WHERE ligne_in_station.name_station = stations.name_station"
    client.query(query, [req.params.id], (err, result) => {
        if(!err){
            let toSend = []
            result.rows.forEach(element => {
                toSend.push({
                    name: element.name_ligne
                });
            });
            res.send(toSend);
        } else{
            console.log(err);
            return res.status(404).json({ 
                message: "Les lignes n'ont pas été trouvés." ,
                error: err
            });
        }
    });
}