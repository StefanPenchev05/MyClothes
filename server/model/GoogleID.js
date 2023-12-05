const mongoose = require("mongoose");

const GoogleIDScheme = new mongoose.Schema({
    googleID: {
        type: String,
        require: true,
        unique: true
    },
    accessToken: String,
    refreshToken: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
});

const googleId = mongoose.model("GoogleOAuth", GoogleIDScheme);

module.exports = googleId;
