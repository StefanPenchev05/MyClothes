const mongo = require("mongoose")

const avatarSchema = new mongo.Schema({
    avatar: Buffer,
    fileType: String,
    uploadedBy: {
        type: mongo.Schema.Types.ObjectId,
        ref: 'users'
    },
    uploadedAt: {
        type: Date,
        default: Date.now
    }
});

const avatar = mongo.model("avatar", avatarSchema);

module.exports = avatar;