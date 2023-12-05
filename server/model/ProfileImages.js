const mongo = require('mongoose')

const imageScheme = new mongo.Schema({
    url: {
        type: String,
        required: true
    },
    uploadDate: {
        type: Date,
        default: Date.now
    },
})

const Image = mongo.model('images', imageScheme)
module.exports = Image;