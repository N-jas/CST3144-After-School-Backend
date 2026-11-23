const path = require("path");

require("dotenv").config({
    path: path.join(__dirname, "config.env")
});

const { MongoClient } = require("mongodb");

async function connectToMongoDB() {
    const {
        MONGODB_PREFIX,
        MONGODB_USERNAME,
        MONGODB_PASSWORD,
        MONGODB_URL
    } = process.env;

    if (
        !MONGODB_PREFIX ||
        !MONGODB_USERNAME ||
        !MONGODB_PASSWORD ||
        !MONGODB_URL
    ) {
        throw new Error("Missing MongoDB settings in config.env");
    }

    const uri =
        MONGODB_PREFIX +
        encodeURIComponent(MONGODB_USERNAME) + ":" +
        encodeURIComponent(MONGODB_PASSWORD) +
        MONGODB_URL;

    const client = new MongoClient(uri);

    try {
        await client.connect();

        console.log("You successfully connected to MongoDB!");

        return client;
    } catch (error) {
        await client.close();
        throw error;
    }
}

module.exports = connectToMongoDB;