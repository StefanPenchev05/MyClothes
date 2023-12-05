require("dotenv").config();
const dbConfig = require("./config/database-config.json");
const indexRouter = require("./routes/indexRouter");
const { dbConnect } = require("./config/dbConfig");
const { sessionMiddleware } = require("./config/sessionConfig");
const checkSession = require('./middleware/checkAuth')
const { clearExpiredTokens } = require("./utils/tokenUtils")

const express = require("express");
const cron = require("node-cron");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const cors = require("cors")
const app = express();

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: false }));

// Handles security
app.use(helmet());

//Limit the number of requests
app.use(rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
}));

// Handles CORS
//process.env.CORS_ORIGIN || 'http://192.168.1.4:3000'
app.use(cors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    allowedHeaders: ['Content-Type']
}));

//Handles the sessions
app.use(sessionMiddleware);

//Checks for session
//app.use(checkSession.checkSession);

//Running the React HTML
app.use(express.static("build"));

//Handles the RESTful api 
app.use("/", indexRouter);

// Schedule the token cleanup to run every 2 minutes
cron.schedule("*/2 * * * *", () => {
    clearExpiredTokens();
})

async function main() {
    const port = process.env.PORT || 5500

    await dbConnect(process.env.MONGO_URL, dbConfig.driverOptions)
        .then((data) => {
            console.log(data)
            app.listen(port, '0.0.0.0', () => {
                console.log("The server is on port", port);
            })
        })
}

main();