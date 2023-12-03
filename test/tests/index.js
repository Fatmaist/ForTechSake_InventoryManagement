var express = require(`express`);
var bodyParser = require(`body-parser`);
var app = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//require the router we definied in barangkeluar.js
var barangkeluar = require(`./barangkeluar.js`);
const { resourceLimits } = require("worker_threads");

//use the router on the sub route /barangkeluar
app.use(`/barangkeluar, barangkeluar`);

app.listen(3000)
