const express = require("express");
const port = process.env.PORT || 3010;
const app = express();
const router = require("./routes/data_barang");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", router);

app.listen(port, () => {
  console.log(`App Listening on http://localhost:${port}`);
});

module.exports = app;
