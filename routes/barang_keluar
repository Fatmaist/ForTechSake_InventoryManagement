const express = require("express");
const router = express.Router();
const pool = require("../queries");

router.get("/barangkeluar", (req, res) => {
  const limit = req.query.limit ? `LIMIT ${req.query.limit}` : "";

  pool.query(`SELECT * FROM barang_keluar ${limit}`, (err, result) => {
    if (err) {
      throw err;
    }
    res.json(result.rows);
  });
});

router.get("/barangkeluar/:id", (req, res) => {
  pool.query(
    `SELECT * FROM barang_keluar WHERE id_keluar = ${req.params.id}`,
    (err, result) => {
      if (err) {
        throw err;
      }
      res.json(result.rows);
    }
  );
});

router.post("/barangkeluar", (req, res) => {
  pool.query(
    "INSERT INTO barang_keluar (id_barang, tanggal, nama_barang, jumlah, tempat_distributor) VALUES ($1, $2, $3, $4, $5)",
    [
      req.body.id_barang,
      req.body.tanggal,
      req.body.nama_barang,
      req.body.jumlah,
      req.body.tempat_distributor,
    ],
    (err, result) => {
      if (err) {
        throw err;
      }
      res.send("data barang keluar added");
    }
  );
});

router.put("/barangkeluar/:id", (req, res) => {
  const { id_barang, tanggal, nama_barang, jumlah, tempat_distributor } = req.body;

  pool.query(
    "UPDATE barang_keluar SET id_barang=$1, tanggal=$2, nama_barang=$3, jumlah=$4, tempat_distributor=$5",
    [ id_barang, tanggal, nama_barang, jumlah, tempat_distributor, req.params.id],
    (err, result) => {
      if (err) {
        throw err;
      }
      res.send("data barang keluar updated");
    }
  );
});

router.delete("/barangkeluar/:id", (req, res) => {
  pool.query(
    `DELETE FROM barang_keluar WHERE id_keluar = ${req.params.id}`,
    (err, result) => {
      if (err) {
        throw err;
      }
      res.send("data barang keluar deleted");
    }
  );
});

module.exports = router;