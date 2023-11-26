const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const port = process.env.PORT || 3010;
const app = express();
const router = require("./routes/data_barang");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Middlewares
app.use(helmet()); // Menambahkan middleware helmet untuk keamanan
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("combined")); // Menambahkan logging menggunakan morgan

// Router
app.use("/api", router);

// Konfigurasi Swagger
const options = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "Express API with Swagger",
      version: "1.0.0",
      description:
        "This is a CRUD API for Data Barang of Management Inventory Develop",
    },
    servers: [
      {
        url: "http://localhost:3010", // Sesuaikan dengan port server Anda
      },
    ],
  },
  apis: ["./routes/*.js"], // Pastikan sesuai dengan path file yang sesuai
};

const specs = swaggerJsDoc(options);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// Start Server
app.listen(port, () => {
  console.log(`App Listening on http://localhost:${port}`);
});

module.exports = app;
