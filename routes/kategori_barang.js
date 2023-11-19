var express = require("express");
var router = express.Router();
var pool = require("../queries");

// API untuk mendapatkan semua kategori_barang
router.get("/kategoribarang", (req, res) => {
  pool.query("SELECT * FROM kategori_barang", (err, result) => {
    if (err) {
      console.log(err);
    }
    res.json(result.rows);
  });
});

// API untuk mendapatkan kategori_barang berdasarkan ID
router.get("/kategoribarang/:id_kategori", (req, res) => {
  const { id_kategori } = req.params;
  pool.query(
    "SELECT * FROM kategori_barang WHERE id_kategori=$1",
    [id_kategori],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.json(result.rows);
    }
  );
});

// API untuk menambahkan kategori_barang baru
router.post("/kategoribarang", (req, res) => {
  const { nama_kategori, deskripsi } = req.body;
  pool.query(
    "INSERT INTO kategori_barang (nama_kategori, deskripsi) VALUES ($1, $2)",
    [nama_kategori, deskripsi],
    (err, result) => {
      if (err) {
        throw err;
      }
      res.send("Kategori barang added");
    }
  );
});

// API untuk memperbarui kategori_barang
router.put("/kategoribarang/:id_kategori", (req, res) => {
  const { nama_kategori, deskripsi } = req.body;
  pool.query(
    "UPDATE kategori_barang SET nama_kategori=$1, deskripsi=$2 WHERE id_kategori=$3",
    [nama_kategori, deskripsi, req.params.id_kategori],
    (err, result) => {
      if (err) {
        throw err;
      }
      res.send("Kategori barang updated");
    }
  );
});

// API untuk menghapus kategori_barang
router.delete("/kategoribarang/:id_kategori", (req, res) => {
  pool.query(
    "DELETE FROM kategori_barang WHERE id_kategori=$1",
    [req.params.id_kategori],
    (err, result) => {
      if (err) {
        throw err;
      }
      res.send("Kategori barang deleted");
    }
  );
});

module.exports = router;
