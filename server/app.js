const express = require('express');
const bodyParser = require("body-parser");
const path = require('path');
const dotenv = require('dotenv');
var cors = require('cors');


dotenv.config();

const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const uri = process.env.DB_URL;

mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
var db = mongoose.connection;
autoIncrement.initialize(db);
db.once("open", function (callback) {
	console.log("Connection Succeeded");
});

var data = require('./routes/database');
var routes = require('./routes');
var app = express();



app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));


//Routes
app.get('/', routes.index);
app.post('/database/fetchDatabase', data.fetchDatabase);
app.post('/database/fetchS2IDList', data.returnS2Id);
app.post('/database/fetchCompanyList', data.returnCompanyList);


app.listen(4000, function () {
	console.log('Server is running.. on Port 4000 Ajaja!!!');
});