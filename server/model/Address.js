const mongo = require('mongoose');

const addressSchema = new mongo.Schema({
    street: String,
    city: String,
    state: String,
    zip: String,
    country: String
});

const Address = mongo.model('addresses', addressSchema);
module.exports = Address;