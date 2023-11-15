var express = require("express");
var app = express();
var pool = require("./queries");
var datapetugasRouter = require("./routes/datapetugas");

var bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(datapetugasRouter);

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger-output.json");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

pool.connect((err, res) => {
  console.log(err);
  console.log("connected");
});

app.listen(3000);
