var express = require('express')
var router = express.Router()

module.exports = function (app) {
    const userRoute = require('../routes/userRoutes');

    app.get('/', (req, res) => {
        return res.send(
             "Welcome to To Do List."
        )
    })

    app.use('/api', 
        [
         userRoute
        ]
    );
};