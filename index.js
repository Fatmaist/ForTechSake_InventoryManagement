const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerDocument = require('./swagger-output.json');
const swaggerDocument2 = require('./swagger-output2.json');
const bodyParser = require('body-parser');
var pool = require('./queries')
const data_supplier = require('./routes/data_supplier');
const restock = require('./routes/restock_barang');
const data_petugas = require('./routes/datapetugas');
const barangMasuk = require('./routes/barangMasuk');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/', data_supplier);
app.use('', restock);
app.use('', data_petugas);
app.use('', barangMasuk);

// Swagger setup
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Data API',
      version: '1.0.0',
    },
  },
  apis: ['./routes/*.js'],
};

const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs)), swaggerUi.setup(swaggerDocument, swaggerDocument2);

// Database Connection
pool.connect((err, res) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Connected to the database');
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app; // For testing with Jest
