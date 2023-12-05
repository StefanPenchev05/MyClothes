const mongo = require('mongoose');

const CityScheme = new mongo.Schema({
    name: String,
    country: String,
});

const CityModel = mongo.model('cities', CityScheme);
module.exports = CityModel;