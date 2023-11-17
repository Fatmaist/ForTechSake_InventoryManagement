var express = require("express");
var router = express.Router();
var pool = require("../queries");

// API untuk mendapatkan semua data_barang
router.get("/databarang", (req, res) => {
  pool.query("SELECT * FROM data_barang", (err, result) => {
    if (err) {
      console.log(err);
    }
    res.json(result.rows);
  });
});

// API untuk mendapatkan data_barang berdasarkan ID
router.get("/databarang/:id_barang", (req, res) => {
  const { id_barang } = req.params;
  pool.query(
    "SELECT * FROM data_barang WHERE id_barang=$1",
    [id_barang],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.json(result.rows);
    }
  );
});

// API untuk menambahkan data_barang baru
router.post("/databarang", (req, res) => {
  const { nama_barang, stok, id_kategori, id_supplier } = req.body;
  pool.query(
    "INSERT INTO data_barang (nama_barang, stok, id_kategori, id_supplier) VALUES ($1, $2, $3, $4)",
    [nama_barang, stok, id_kategori, id_supplier],
    (err, result) => {
      if (err) {
        throw err;
      }
      res.send("Data barang added");
    }
  );
});

// API untuk memperbarui data_barang
router.put("/databarang/:id_barang", (req, res) => {
  const { nama_barang, stok, id_kategori, id_supplier } = req.body;
  pool.query(
    "UPDATE data_barang SET nama_barang=$1, stok=$2, id_kategori=$3, id_supplier=$4 WHERE id_barang=$5",
    [nama_barang, stok, id_kategori, id_supplier, req.params.id_barang],
    (err, result) => {
      if (err) {
        throw err;
      }
      res.send("Data barang updated");
    }
  );
});

// API untuk menghapus data_barang
router.delete("/databarang/:id_barang", (req, res) => {
  pool.query(
    "DELETE FROM data_barang WHERE id_barang=$1",
    [req.params.id_barang],
    (err, result) => {
      if (err) {
        throw err;
      }
      res.send("Data barang deleted");
    }
  );
});

module.exports = router;
