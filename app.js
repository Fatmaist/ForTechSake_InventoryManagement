const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const port = process.env.PORT || 3010;
const app = express();
const router = require("./routes/data_barang");

// Middlewares
app.use(helmet()); // Menambahkan middleware helmet untuk keamanan
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("combined")); // Menambahkan logging menggunakan morgan

// Router
app.use("/api", router);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// Start Server
const listener = server.listen(port, () => {
  console.log(`App Listening on http://localhost:${listener.address().port}`);
});

module.exports = { app, server };
