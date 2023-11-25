const express = require("express");
const router = express.Router();
const pool = require("../queries");

router.get("/data_barang", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM data_barang");
    res.status(200).json({
      status: 200,
      message: "Hooray: We found some magical data barang!",
      data: result.rows,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      message: "Oopsie Daisy: Our server had a little hiccup",
    });
  }
});

router.get("/data_barang/:id_barang", async (req, res) => {
  const { id_barang } = req.params;
  try {
    const result = await pool.query(
      "SELECT * FROM data_barang WHERE id_barang = $1",
      [id_barang]
    );
    if (result.rows.length === 0) {
      res.status(404).json({
        status: 404,
        message: "Oh no: Data barang went on a vacation, nowhere to be found!",
      });
    } else {
      res.status(200).json({
        status: 200,
        message: "Success: We found the treasure data barang!",
        data: result.rows[0],
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      message: "Oopsie Daisy: Our server had a little hiccup",
    });
  }
});

router.post("/data_barang", async (req, res) => {
  const { id_barang, nama_barang, stok, id_kategori, id_supplier } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO data_barang (id_barang, nama_barang, stok, id_kategori, id_supplier) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [id_barang, nama_barang, stok, id_kategori, id_supplier]
    );

    res.status(201).json({
      status: 201,
      message: "Woo-hoo: We successfully spawned a new data barang!",
      data: result.rows[0],
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      status: 400,
      message: "Oh Snap: Something went haywire with your request!",
    });
  }
});

router.put("/data_barang/:id_barang", async (req, res) => {
  const { id_barang } = req.params;
  const { nama_barang, stok, id_kategori, id_supplier } = req.body;
  try {
    const result = await pool.query(
      "UPDATE data_barang SET nama_barang = $1, stok = $2, id_kategori = $3, id_supplier = $4 WHERE id_barang = $5 RETURNING *",
      [nama_barang, stok, id_kategori, id_supplier, id_barang]
    );
    if (result.rows.length === 0) {
      res.status(404).json({
        status: 404,
        message: "Oh no: The elusive data barang seems to have slipped away!",
      });
    } else {
      res.status(200).json({
        status: 200,
        message: "Success: We gave our data barang a fancy makeover!",
        data: result.rows[0],
      });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({
      status: 400,
      message: "Oh Snap: Something went haywire with your request!",
    });
  }
});

router.delete("/data_barang/:id_barang", async (req, res) => {
  const { id_barang } = req.params;
  try {
    const result = await pool.query(
      "DELETE FROM data_barang WHERE id_barang = $1 RETURNING *",
      [id_barang]
    );
    if (result.rows.length === 0) {
      res.status(404).json({
        status: 404,
        message:
          "Oh no: The data barang we wanted to delete is playing hide and seek!",
      });
    } else {
      res.status(200).json({
        status: 200,
        message: "Success: We bid farewell to the data barang! 🎉",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      message: "Oopsie Daisy: Our server had a little hiccup",
    });
  }
});

module.exports = router;
