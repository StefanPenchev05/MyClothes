const mongoose = require('mongoose');

const countrySchema = new mongoose.Schema({
    code: String,
    label: String,
    phone: String
});

const Country = mongoose.model('countries', countrySchema);
module.exports = Country;