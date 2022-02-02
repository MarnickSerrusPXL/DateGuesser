const axios = require('axios');
const Anime = require('../models/animeModel.js');

module.exports.getTop10Shows = async function() {
    const instance = axios.create({
        headers: {'X-MAL-CLIENT-ID': 'insert Id'}
    });

    return await instance.get('https://api.myanimelist.net/v2/anime/ranking?ranking_type=all&limit=500');
}

module.exports.getStartDateShow = async function(id) {
    const instance = axios.create({
        headers: {'X-MAL-CLIENT-ID': 'insert Id'}
    });

    return await instance.get('https://api.myanimelist.net/v2/anime/' + id + '?fields=start_date');
}

module.exports.getRandom = async function() {
    return Anime.aggregate([{$sample: {size: 1}}])
}

module.exports.get10 = async function() {
    return 10;
}