var express = require("express");
var pool = require("./queries");
const bodyParser = require("body-parser");
var barangkeluar = require("./routes/barangkeluar");
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(barangKeluarRouter);

pool.connect((err, res) => {
  console.log(err);
  console.log("connected");
});

const options = {
  definition: {
      openapi: '3.0.0',
      info: {
          title: 'Express API with Swagger',
          version: '0.1.0',
          description: 'This is a CRUD API for Barang Keluar',
      },
      servers: [
          {
              url: 'http://localhost:3000',
          }
      ]
  },
  apis: ['./routes/*'],
}

const specs = swaggerJsDoc(options)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.listen(3000)