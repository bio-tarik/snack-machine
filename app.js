const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const redis = require('redis');

//Redis
let client = redis.createClient();
client.on('connect', () => {
    console.log('Connected to Redis');
})

//Init app
const port = 3000;
const app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'));

app.get('/', (req, res, next) => {
    res.render('search');
});

app.post('', (req, res, next) => {
    let id = req.body.id;
})

app.listen(port, () => {
    console.log('Server start on port ' + port);
})
