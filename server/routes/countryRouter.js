const express = require("express");
const router = express.Router();
const CountryModel = require("../model/Country");

router.get('/', async (req, res) => {
    await CountryModel.find({})
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            res.status(500).send(error);
        });
});

module.exports = router;