const mongoose = require("mongoose");

const TokenScheme = new mongoose.Schema({
    resetPasswordToken: {
        type: String,
        required: true
    },
    resetPasswordExpires: {
        type: Date,
        required: true
    },
});

const token = mongoose.model("tokens", TokenScheme);

module.exports = token;