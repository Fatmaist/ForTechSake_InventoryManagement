const express = require("express");
const router = express.Router();
const pool = require("../queries");
const bodyParser = require("body-parser");

router.use(bodyParser.json());

//API to get all barang_masuk
router.get("/barangmasuk", (req, res) => {
  pool.query("SELECT * FROM barang_masuk", (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send({ message: "Failed to get data!" });
    }
    res.status(200).json(result.rows);
  });
});

//API to get all barang_masuk by id_masuk
router.get("/barangmasuk/:id", (req, res) => {
  pool.query(
    `SELECT * FROM barang_masuk WHERE id_masuk = ${req.params.id}`,
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send({ message: "Failed to get data by id!" });
      }
      res.status(200).json(result.rows);
    }
  );
});

//API to post barang_masuk
router.post("/barangmasuk", (req, res) => {
  const { id_masuk, id_barang, tanggal, nama_barang, jumlah } = req.body;

  pool.query(
    "INSERT INTO barang_masuk (id_masuk, id_barang, tanggal, nama_barang, jumlah) VALUES ($1, $2, $3, $4, $5)",
    [id_masuk, id_barang, tanggal, nama_barang, jumlah],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Failed to insert data barang masuk!");
      } else {
        res.status(200).send("data barang masuk added");
      }
    }
  );
});

//API to update all atribut barang_masuk by id_masuk
router.put("/barangmasuk/:id", (req, res) => {
  const { id_masuk, id_barang, tanggal, nama_barang, jumlah } = req.body;

  pool.query(
    "UPDATE barang_masuk SET id_masuk=$1, id_barang=$2, tanggal=$3, nama_barang=$4, jumlah=$5 WHERE id_masuk=$6",
    [id_masuk, id_barang, tanggal, nama_barang, jumlah, req.params.id],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Failed to update data barang masuk!");
      } else {
        res.status(200).send("data barang masuk updated");
      }
    }
  );
});

//API to delete barang_masuk
router.delete("/barangmasuk/:id", (req, res) => {
  pool.query(
    `DELETE FROM barang_masuk WHERE id_masuk = ${req.params.id}`,
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Failed to delete data barang masuk!");
      }
      res.status(200).send("data barang masuk deleted");
    }
  );
});

module.exports = router;
