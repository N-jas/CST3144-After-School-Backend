const express = require("express");
const cors = require("cors");
const lessons = require("./lessons");
const app = express();
const port = process.env.PORT || 3000;

// Log every incoming request.
app.use(function(request, response, next) {
    console.log(request.method + " " + request.originalUrl);
    next();
});

// Allow Express to read JSON request bodies.
app.use(cors());
app.use(express.json());

// A simple route to check that the server works.
app.get("/", function(request, response) {
    response.json({
        message: "After School API is running"
    });
});

app.get("/lessons", function(request, response) {
    response.json(lessons);
});

// Handle requests that do not match a route.
app.use(function(request, response) {
    response.status(404).json({
        error: "Route not found"
    });
});

app.listen(port, function() {
    console.log("Server listening on port " + port);
});