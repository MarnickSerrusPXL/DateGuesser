const express = require("express");
const dotenv=require("dotenv");
dotenv.config();
const PORT = process.env.PORT;
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const createError = require("http-errors");
const $console = require('Console');
const animeRouter = require("./routes/anime");
const mongoose = require("mongoose");

const app = express();

app.use("/anime", animeRouter);
app.use(bodyParser.json());

mongoose.connection.on("disconnected", function(){
    $console.error((new Date()).toUTCString(), "\tDisconnected from database.");
});
mongoose.connection.on("connected", function(){
    $console.log((new Date()).toUTCString(), "\tConnected to database.");
});

app.listen(PORT, () => {
    $console.log((new Date()).toUTCString(), `\tApp listening at port ${PORT}.` );
});

mongoose.connect('mongodb://localhost:27017/dragDrop');
process.on("SIGINT", cleanup);
process.on("SIGTERM", cleanup);

function cleanup (event) {
    $console.log((new Date()).toUTCString(), "\nBye!");
    mongoose.connection.close();
    process.exit();
}