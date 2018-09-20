const express = require("express");
const app = express();
app.use(express.static("public"));

const morgan = require("morgan");
const bodyParser = require("body-parser");



//version
// const v1=express.Router();
// v1.use("v1");
//Initializ and use routes
const menusRoutes = require("./api/routes/menus");
const orderRoutes = require("./api/routes/orders");

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});

// Routes which should handle requests
//use routes

app.use("/api/v1/menus", menusRoutes);
app.use("/api/v1/orders", orderRoutes);

// app.use((req,res,next) => {
//     res.status(200).json({
//         message: "Connected!"
//     });next();
// });

app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
});
//
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
    next(error);
});

module.exports = app;
