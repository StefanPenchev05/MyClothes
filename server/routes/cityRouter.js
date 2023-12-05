const express = require("express");
const router = express.Router();
const CityModel = require("../model/City");

router.post('/', async (req, res) => {
    const { country } = req.body;
    const data = await CityModel.find({ country: country });
    res.status(200).json(data);
});

module.exports = router;