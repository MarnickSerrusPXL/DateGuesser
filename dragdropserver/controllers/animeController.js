const animeService = require("../services/animeService");
const dotenv=require("dotenv");

module.exports.getTop10Shows = async function(req, res, next) {
    try{
        const status = 200;
        let shows  = await animeService.getTop10Shows();
        let foundIds = [];
        let foundImg = [];
        let startDateOf = [];
        for (let item of shows.data.data){
            console.log("Finding initial data")
            foundIds.push(item.node.id);
            foundImg.push(item.node.main_picture.medium);
        }
        let count = 0;
        for (let id of foundIds){
            console.log("Looking up start date of show with id: " + id)
            console.log("Finished " + count + "/500")
            startDateOf.push((await animeService.getStartDateShow(id)).data.start_date);
            count = count + 1;
        }
        let foundShows = [];
        for (let i = 0; i < foundIds.length; i++){
            foundShows.push({id:foundIds[i], image:foundImg[i], start:startDateOf[i]})
        }
        const fs = require('fs')

        try {
            fs.writeFileSync('output.txt', JSON.stringify(foundShows))
            console.log("finished writing")
        } catch (err) {
            console.error(err)
        }
        res.status(status).json(foundShows);
    }catch (err){
        next(err);
    }
}

module.exports.getRandomShow = async function(req, res, next) {
    try{
        const status = 200;
        let shows  = await animeService.getRandom();
        res.status(status).json(shows);
    }catch (err){
        next(err);
    }
}

module.exports.get10 = async function(req, res, next) {
    try{
        const status = 200;
        let shows  = await animeService.get10();
        res.status(status).json(shows);
    }catch (err){
        next(err);
    }
}