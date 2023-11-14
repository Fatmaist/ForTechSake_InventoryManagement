var express = require("express");
var pool = require("./queries");
const bodyParser = require("body-parser");
var barangMasukRouter = require("./routes/barangMasuk");
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(barangMasukRouter);

pool.connect((err, res) => {
  console.log(err);
  console.log("connected");
});

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger-output.json");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(3000);
