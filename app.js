const client = require("./server");
const express = require('express');
const app = express();

const restaurantRoutes = require("./router/restaurantRouter");
const commentRoutes = require("./router/commentRouter");
const addressRoutes = require("./router/addressRouter");
const horairesRoutes = require("./router/horairesRouter");
const picturesRoutes = require("./router/picturesRouter");
const place_likedRoutes = require("./router/place_likedRouter");
const usersRoutes = require("./router/authRouter");
const bodyParser = require('body-parser');
const customRoutes = require("./router/customRouter");
const stationRoutes = require('./router/stationRouter');


const cors = require('cors');
app.use(cors());
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true, parameterLimit: 100000 }))

app.listen(3000, () => {
    console.log("Back NiceToMealYou lancé");
});

client.connect();

app.use('/', usersRoutes);
app.use('/', restaurantRoutes);
app.use('/', addressRoutes);
app.use('/', commentRoutes);
app.use('/', horairesRoutes);
app.use('/', picturesRoutes);
app.use('/', place_likedRoutes);
app.use('/', customRoutes);
app.use('/', stationRoutes);
