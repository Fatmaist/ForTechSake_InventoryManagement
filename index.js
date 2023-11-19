var express = require("express");
var app = express();
var pool = require("./queries");
var databarangRouter = require("./routes/databarang");
var bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/databarang", databarangRouter); // Menggunakan router untuk API data_barang

const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");

// Konfigurasi Swagger
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Inventory Management API",
      version: "1.0.0",
    },
  },
  apis: ["./routes/databarang.js"],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

pool.connect((err, res) => {
  console.log(err);
  console.log("connected");
});

app.listen(3000);
