const express = require('express');

const app = express();

const bodyParser = require('body-parser');
const morgan = require('morgan');

app.use(express.static('public'));

//  Initialize routes which should handle requests
const menusRoutes = require('./api/routes/menus');
const orderRoutes = require('./api/routes/orders');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//  use routes

app.use('/api/v1/menus', menusRoutes);
app.use('/api/v1/orders', orderRoutes);

// handling errors
// app.use((req,res,next) => {
//     res.status(200).json({
//         message: "Connected!"
//     });next();
// });

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message,
        },
    });
    next(error);
});

module.exports = app;
