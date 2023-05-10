const client = require("./server");
const express = require('express');
const app = express();

const placesRoutes = require("./router/placesRouter");
const barRoutes = require("./router/barRouter");
const restaurantsRoutes = require("./router/restaurantsRouter");
const commentRoutes = require("./router/commentRouter");
const addressRoutes = require("./router/addressRouter");
const favorite_typeRoutes = require("./router/favorite_typeRouter");
const horairesRoutes = require("./router/horairesRouter");
const ligneRoutes = require("./router/ligneRouter");
const ligne_in_stationRoutes = require('./router/ligne_in_stationRouter')
const picturesRoutes = require("./router/picturesRouter");
const place_likedRoutes = require("./router/place_likedRouter");
const station_in_placeRoutes = require("./router/station_in_placeRouter");
const station_of_userRoutes = require("./router/station_of_userRouter");
const stationRoutes = require("./router/stationRouter");
const type_picturesRoutes = require("./router/type_picturesRouter");
const usersRoutes = require("./router/authRouter");
const bodyParser = require('body-parser');
const customRoutes = require("./router/customRouter");


const cors = require('cors');
app.use(cors());
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true, parameterLimit: 100000 }))

app.listen(3000, () => {
    console.log("Back NiceToMealYou lancé");
});

client.connect();

app.use('/', placesRoutes);
app.use('/', barRoutes);
app.use('/', usersRoutes);
app.use('/', restaurantsRoutes);
app.use('/', addressRoutes);
app.use('/', commentRoutes);
app.use('/', favorite_typeRoutes);
app.use('/', horairesRoutes);
app.use('/', ligne_in_stationRoutes);
app.use('/', ligneRoutes);
app.use('/', picturesRoutes);
app.use('/', place_likedRoutes);
app.use('/', station_in_placeRoutes);
app.use('/', station_of_userRoutes);
app.use('/', stationRoutes);
app.use('/', type_picturesRoutes);
app.use('/', customRoutes);
