const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const redis = require('redis');
const crypto = require("crypto");

//Redis
let client = redis.createClient();
client.on('connect', () => {
    require('./config/redis-setup')(client);
    console.log('Connected to Redis');
})

//Init app
const port = 3000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'));

app.get('/', (req, res, next) => {
    res.json({ "message": "Snack machine is alive!" });
});

app.post('/card/insert', (req, res) => {
    let id = req.body.id;

    client.hgetall(id, (err, obj) => {
        if (!obj) {
            res.status(412);
            res.json({ "message": "Card not found" });
        }
        else{
            res.statusCode(200);
            console.log("obj", obj);
        }
    })
})

//Routes
require('./routes/routes')(app, client);

app.listen(port, () => {
    console.log('Server start on port ' + port);
})