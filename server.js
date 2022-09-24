const dotenv = require("dotenv");
dotenv.config();
const express = require('express')
const route = require('./routes/index');
var cors = require('cors');
const process = require('process')
const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
const mongoose = require('mongoose')

const port = process.env.APP_PORT || 3000;
try {
    mongoose.connect(process.env.MONGO_URL, {  useNewUrlParser: true, useUnifiedTopology: true});
} catch (error) {
    console.log(error.message);
}


app.listen(port, () => {
    console.log(`Server connect on port number ${port}`);
})

route(app);