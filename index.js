var express = require("express");
var app = express();
var pool = require("./queries");
var barangMasukRouter = require("./routes/barangMasuk");

app.use(barangMasukRouter);

pool.connect((err, res) => {
  console.log(err);
  console.log("connected");
});

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger-output.json");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(3000);
