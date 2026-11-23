const express = require("express");
const cors = require("cors");
const connectToMongoDB = require("./database");

const app = express();
const port = process.env.PORT || 3001;

let db;

// Log every incoming request.
app.use(function(request, response, next) {
    console.log(request.method + " " + request.originalUrl);
    next();
});

// Allow frontend requests and read JSON request bodies.
app.use(cors());
app.use(express.json());

// Check that the API is running.
app.get("/", function(request, response) {
    response.json({
        message: "After School API is running"
    });
});

// Retrieve lessons from MongoDB Atlas.
app.get("/lessons", async function(request, response) {
    try {
        const collection = db.collection("Lessons");
        const documents = await collection.find({}).toArray();

        console.log("Database:", db.databaseName);
        console.log("Lessons found:", documents.length);

        // Match the field names used by the frontend.
        const lessons = documents.map(function(document) {
            return {
                _id: document._id,
                id: document.id,
                subject: document.topic,
                location: document.location,
                price: document.price,
                spaces: document.space,
                icon: document.icon
            };
        });

        response.json(lessons);
    } catch (error) {
        console.error("Failed to retrieve lessons:", error.message);

        response.status(500).json({
            error: "Unable to retrieve lessons"
        });
    }
});

// Handle unknown routes. Keep this after all valid routes.
app.use(function(request, response) {
    response.status(404).json({
        error: "Route not found"
    });
});

// Connect to Atlas before starting the server.
connectToMongoDB()
    .then(function(client) {
        db = client.db("After-school");

        const server = app.listen(port, function() {
            console.log("Connected database:", db.databaseName);
            console.log("Server listening on port " + port);
        });

        server.on("error", function(error) {
            console.error("Server failed to start:", error.message);

            client.close().finally(function() {
                process.exitCode = 1;
            });
        });
    })
    .catch(function(error) {
        console.error("Database connection failed:", error.message);
        process.exitCode = 1;
    });