const mongo = require("mongoose")

const avatarSchema = new mongo.Schema({
    avatar: {
        type: String,
        default: null
    },
    fileName: {
        type: String,
        default: null
    },
    uploadedAt: {
        type: Date,
        default: Date.now
    }
});

const avatar = mongo.model("avatar", avatarSchema);

module.exports = avatar;