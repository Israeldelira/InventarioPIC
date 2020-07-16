require('./config/config');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyparser = require('body-parser');
const path = require('path')

// parse aplication/x-www.form-uelencoded
app.use(bodyparser.urlencoded({ extended: false }));


app.set('views', path.join(__dirname, '../../Frontend/views'));
app.set('view engine', 'ejs');

//parse formato a application/json

app.use(bodyparser.json());
// Habilita CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization,token'
    );
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PATCH, PUT, DELETE, OPTIONS'
    );
    next();
});
app.use(express.static(__dirname + '/public'));


app.use(require('./routes/index'));
app.get('/', function(req, res) {
    res.render('index');
});

//Conexion a base de datos
mongoose.connect(process.env.URLDB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    },
    (err, resp) => {
        if (err) throw err;

        console.log('Base de datos ONLINE');
    });

app.listen(process.env.PORT, '0.0.0.0',
    () => { console.log('Listening to port: ' + process.env.PORT); });