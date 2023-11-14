const express = require("express");
const router = express.Router();
const pool = require("../queries");

router.get("/barangmasuk", (req, res) => {
  const limit = req.query.limit ? `LIMIT ${req.query.limit}` : "";

  pool.query(`SELECT * FROM barang_masuk ${limit}`, (err, result) => {
    if (err) {
      throw err;
    }
    res.json(result.rows);
  });
});

router.get("/barangmasuk/:id", (req, res) => {
  pool.query(
    `SELECT * FROM barang_masuk WHERE id_masuk = ${req.params.id}`,
    (err, result) => {
      if (err) {
        throw err;
      }
      res.json(result.rows);
    }
  );
});

router.post("/barangmasuk", (req, res) => {
  pool.query(
    "INSERT INTO barang_masuk (id_masuk, id_barang, tanggal, nama_barang, jumlah) VALUES ($1, $2, $3, $4, $5)",
    [
      req.body.id_masuk,
      req.body.id_barang,
      req.body.tanggal,
      req.body.nama_barang,
      req.body.jumlah,
    ],
    (err, result) => {
      if (err) {
        throw err;
      }
      res.send("data barang masuk added");
    }
  );
});

router.put("/barangmasuk/:id", (req, res) => {
  const { id_masuk, id_barang, tanggal, nama_barang, jumlah } = req.body;

  pool.query(
    "UPDATE barang_masuk SET id_masuk=$1, id_barang=$2, tanggal=$3, nama_barang=$4, jumlah=$5 WHERE id_masuk=$6",
    [id_masuk, id_barang, tanggal, nama_barang, jumlah, req.params.id],
    (err, result) => {
      if (err) {
        throw err;
      }
      res.send("data barang masuk updated");
    }
  );
});

router.delete("/barangmasuk/:id", (req, res) => {
  pool.query(
    `DELETE FROM barang_masuk WHERE id_masuk = ${req.params.id}`,
    (err, result) => {
      if (err) {
        throw err;
      }
      res.send("data barang masuk deleted");
    }
  );
});

module.exports = router;
