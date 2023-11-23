var express = require("express");
var app = express();
var pool = require("./queries");
var swaggerJsDoc = require("swagger-jsdoc");
var swaggerUi = require("swagger-ui-express");
var databarangRouter = require("./routes/data_barang");
app.use("", data_barang);

pool.connect((err, res) => {
  console.log(err);
  console.log("connected");
});

const options = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "Express API with Swagger",
      version: "1.0.0",
      description: "This is a CRUD API for Data Barang of Management Inventory",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJsDoc(options);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
);

app.listen(3000);
