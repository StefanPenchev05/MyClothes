const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = process.env.ACCESS_TOKEN_SECRET;

if (!secret) {
    throw new Error('Missing secret for JWT token');
}

module.exports = {
    generateToken: (userID) => {
        try {
            if (!userID) {
                return null;
            }
            const payload = { userID };
            const token = jwt.sign(payload, secret, { expiresIn: '24h' });
            return token;
        } catch (error) {
            console.error('Error generating token: ', error);
            return userID;
        }
    },
    resolveToken: (token) => {
        try {
            if (!token) {
                return null;
            }
            const decoded = jwt.verify(token, secret);
            return decoded.userID;
        } catch (error) {
            console.error('Error decoding token: ', error);
            return null;
        }
    }
};