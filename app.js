const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const User = require("./model/user");

app.options('*', cors());
app.use(cors());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Contro-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200)
    }
    next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
});

app.get('/', async function (req, res) {
    res.status(200).send({
        success: true,
        message: 'Oh boe',
        data: await User.find({})

    });
})

mongoose
    .connect(
        "mongodb+srv://arthur:poq7283ipod@cluster0-e7jon.mongodb.net/test?retryWrites=true&w=majority", { useNewUrlParser: true }
    )
    .then(result => {
        app.listen(8080);
        console.log('Listening to port 8080');
    })
    .catch(err => console.log(err));