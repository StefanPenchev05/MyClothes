const mongo = require("mongoose")

const avatarSchema = new mongo.Schema({
    avatar: Buffer,
    fileType: String,
    uploadedBy: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    uploadedAt: {
        type: Date,
        default: Date.now
    }
});

const avatar = mongo.model("avatars", avatarSchema);

module.exports = avatar;