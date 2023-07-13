const client = require("../server");
const idfMetros = require("../data/idf_transports.json")
let axios = require("axios");

//////////////////////////  Get  //////////////////////////
exports.getStationOfPlaceByCoords = (req,res) => {
    const coords = JSON.parse(req.params.location);
    const url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + coords.location.lat + '%2C' + coords.location.lng + '&radius=500&type=subway_station&key=AIzaSyB0Z20AZ97BfKKtx2qv5kFcs3vvDJeKwWI';
    
    let config = {
    method: 'get',
    url: url,
    headers: { }
    };

    axios(config)
    .then(function (response) {
        let toReturn = [];
        for(let i = 0; i < response.data.results.length; i++){
            switch(coords.region){
                case "IDF": 
                    idfMetros.forEach(transport => {
                        if(transport.name === response.data.results[i].name){
                            toReturn.push({
                                name: response.data.results[i].name,
                                reg: coords.region,
                                transport: transport.transport,
                                ligne: transport.ligne,
                                distance: calcCrow(coords.location.lat,coords.location.lng,response.data.results[i].geometry.location.lat,response.data.results[i].geometry.location.lng)
                            });
                        }
                    });
                break;
            }
        }
        shorterByLigne = [];
        toReturn.forEach(element => {
            const filterByLigne = toReturn.filter(e => e.ligne === element.ligne);
            if(filterByLigne.length > 1){
                shorter = {
                    name: element.name,
                    ligne: element.ligne
                }
                filterByLigne.forEach(e => {
                    if(e.distance < element.distance)   shorter.ligne = e.name;
                });
                shorterByLigne.push(shorter);
            }
        });

        toReturn = toReturn.filter(element => {
            delete element.distance;
            const find = shorterByLigne.find(e => e.ligne === element.ligne);
            if(find != null && element.name !== find.name)  return false;
            return true;
        });

        let filterByStationName = toReturn.filter((value, index, self) =>
        index === self.findIndex((t) => (
          t.name === value.name
        )));
            
        filterByStationName.forEach(element => {
            element.lignes = [];
            const filter = toReturn.filter(e => e.name === element.name);
            filter.forEach(e => {
                element.lignes.push(e.ligne);
            });
            delete ligne;
        });
        res.send(filterByStationName);
    })
    .catch(function (error) {
        console.log(error);
    });
}
function calcCrow(lat1, lon1, lat2, lon2) 
{
    var R = 6371; // km
    var dLat = toRad(lat2-lat1);
    var dLon = toRad(lon2-lon1);
    var lat1 = toRad(lat1);
    var lat2 = toRad(lat2);

    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c;
    return d;
}
function toRad(Value) 
{
    return Value * Math.PI / 180;
}

exports.getStationOfPlaceById = (req,res) => {
    client.query("SELECT * FROM station_near_place WHERE id_place = $1", 
    [req.params.id], (err, result) => {
        if(!err){
            res.send(result.rows);
        } else{
            console.log(err);
            return res.status(404).json({ 
                message: "Impossible de trouver les stations." ,
                error: err
            });
        }
    })
}
exports.getAllRegion = (req,res) => {
    client.query("SELECT DISTINCT reg FROM station_near_place", (err, result) => {
        if(!err){
            let region = [];
            result.rows.forEach(element => {
                region.push(element.reg);
            });
            res.send(region);
        } else{
            console.log(err);
            return res.status(404).json({ 
                message: "Impossible de trouver les régions." ,
                error: err
            });
        }
    })
}
exports.getLignesOfRegion = (req,res) => {
    client.query("SELECT DISTINCT lignes FROM station_near_place WHERE reg = $1", [req.params.region], (err, result) => {
        if(!err){
            let lignes = [];
            result.rows.forEach(element => {
                element.lignes.forEach(ligne => {
                    lignes.push(ligne);
                });
            });
            lignes = lignes.filter((value, index, self) =>
                index === self.findIndex((t) => (
                t === value
            )));
            res.send(lignes);
        } else{
            console.log(err);
            return res.status(404).json({ 
                message: "Impossible de trouver les régions." ,
                error: err
            });
        }
    })
}
exports.getStationsOfLigne = (req,res) => {
    client.query("SELECT * FROM station_near_place WHERE $1 = ANY(lignes)", [req.params.ligne], (err, result) => {
        if(!err){
            result.rows.forEach(element => {
                delete element.id_place;
                delete element.lignes;
            });
            let stations = result.rows.filter((value, index, self) =>
                index === self.findIndex((t) => (
                t.name === value.name
            )));
            res.send(stations);
        } else{
            console.log(err);
            return res.status(404).json({ 
                message: "Impossible de trouver les régions." ,
                error: err
            });
        }
    })
}
exports.getPlaceIdByLigne = (req,res) => {
    client.query("SELECT id_place FROM station_near_place WHERE $1 = ANY(lignes)", [req.params.ligne], (err, result) => {
        if(!err){
            let ids = [];
            result.rows = result.rows.filter((value, index, self) =>
                index === self.findIndex((t) => (
                t.name === value.name
            )));
            result.rows.forEach(element => {
                ids.push(element.id_place);
            });
            res.send(ids);
        } else{
            console.log(err);
            return res.status(404).json({ 
                message: "Impossible de trouver les régions." ,
                error: err
            });
        }
    })
}
exports.getPlaceIdByStation = (req,res) => {
    const params = JSON.parse(req.params.station)
    client.query("SELECT id_place FROM station_near_place WHERE name = $1 AND reg = $2 AND transport = $3", [params.name,params.reg,params.transport], (err, result) => {
        if(!err){
            let ids = [];
            result.rows = result.rows.filter((value, index, self) =>
                index === self.findIndex((t) => (
                t.name === value.name
            )));
            result.rows.forEach(element => {
                ids.push(element.id_place);
            });
            res.send(ids);
        } else{
            console.log(err);
            return res.status(404).json({ 
                message: "Impossible de trouver les régions." ,
                error: err
            });
        }
    })
}

//////////////////////////  Add  //////////////////////////
exports.addStationOfPlace = (req,res) => {
    client.query("INSERT INTO station_near_place(id_place,reg,name,lignes,transport) Values ($1,$2,$3,$4,$5)", 
    [req.body.idPlace,req.body.reg,req.body.name,req.body.lignes,req.body.transport], (err, result) => {
        if(!err){
            res.status(201).json({
                message: "Stations ajoutées avec succès.",
            });
        } else{
            console.log(err);
            return res.status(404).json({ 
                message: "Les stations n'ont pas pu être ajoutées." ,
                error: err
            });
        }
    })
}
