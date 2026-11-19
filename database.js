require("dotenv").config();

const { MongoClient } = require("mongodb");

async function connectDatabase() {
    if (!process.env.MONGODB_URI) {
        throw new Error("MONGODB_URI is missing from .env");
    }

    const client = new MongoClient(process.env.MONGODB_URI);

    await client.connect();

    const db = client.db("after_school");

    await db.command({ ping: 1 });

    console.log("Connected to MongoDB Atlas");

    return db;
}

module.exports = connectDatabase;