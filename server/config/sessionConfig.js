const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
require("dotenv").config();

const store = MongoDBStore({
    uri: process.env.MONGO_URL,
    collection: "sessions"
});

module.exports = {
    sessionMiddleware: session({
        secret: process.env.SESSION_SECRET_KEY,
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: false,
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        },
        store: store
    }),
    store,
};
