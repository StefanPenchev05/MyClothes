const mongo = require("mongoose")

module.exports = {
    dbConnect: async(MONGO_URL, driverOptions) => {
        return new Promise((resolve, reject) => {
            mongo.connect(MONGO_URL, driverOptions)
            .then(() => {
                resolve("Connected to Database");
            })
            .catch((err) => {
                reject("Error occur connecting to database ", err);
            })
        })
    }
}