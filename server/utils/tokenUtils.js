const UserModel = require("../model/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const usedToken = new Set();

module.exports = {
    // Function to generate a random token
    generateToken: (existingUser) => {
        const payload = {
            email: existingUser.email
        }
        const secret = process.env.ACCESS_TOKEN_SECRET;
        const token = jwt.sign(payload, secret, { expiresIn: `5m` });
        return token
    },
    verifyToken: (token) => {
        if (usedToken.has(token)) {
            throw new Error("JWT already used!")
        }
        const secret = process.env.ACCESS_TOKEN_SECRET
        const payload = jwt.verify(token, secret);
        usedToken.add(token);
        return payload
    },

    // Function to clear expired password reset tokens from the database
    clearExpiredTokens: async () => {
        const currentTime = new Date();
        try {
            // Use the UserModel to update and remove resetPasswordToken and resetPasswordExpires
            // for records where resetPasswordExpires is less than the current time
            await UserModel.updateMany(
                { resetPasswordExpires: { $lt: currentTime } },
                { $unset: { resetPasswordToken: 1, resetPasswordExpires: 1 } }
            );
        } catch (err) {
            console.error('Error clearing expired tokens: ' + err);
        }
    }
}
