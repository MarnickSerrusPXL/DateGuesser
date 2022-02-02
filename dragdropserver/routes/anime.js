const express = require("express");
const router = express.Router();
const animeController = require("../controllers/animeController");

router.get("/top10",
    animeController.getTop10Shows);

router.get("/10",
    animeController.get10);

router.get("/random",
    animeController.getRandomShow)

module.exports = router;