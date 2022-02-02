const mongoose = require("mongoose");

const animeSchema = mongoose.Schema({
        id:{
            type: Number
        },
        image: {
            type: String
        },
        start: {
            type: String
        }
    },
    { collection: "anime" }
);

module.exports = mongoose.model("Anime", animeSchema );