const path = require("path");
const express = require("express");
const morgan = require("morgan");
const app = express();
const jwt = require('jsonwebtoken');

// Logging middleware
app.use(morgan("dev"));

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '../dist')))

app.get("/test", (req, res, next) => {
  res.send("Test route");
});

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
})

app.use((req, res, next) => {
    const auth = req.headers.authorization;
    const token = auth?.startsWith("Bearer ") ? auth.slice(7) : null;

    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (e) {
        req.user = null;
        next({
            name: "AuthenticationError",
            message: "User not authenticated",
        });
    }
});


// TODO: Add your routers here
app.use("/auth",require('./auth'));
app.use("/api",require('./api'))

// Error handling middleware
app.use((error, req, res, next) => {
    console.error('SERVER ERROR: ', error);
    if(res.statusCode < 400) {
        res.status(500);
    }
    res.send({
        error: error.message,
        name: error.name,
        message: error.message,
        table: error.table,
    });
});

// 404 handler
app.get('*', (req, res) => {
    res.status(404).send({
        error: '404 - Not Found',
        message: 'No route found for the requested URL',
    });
});
  

module.exports = app;