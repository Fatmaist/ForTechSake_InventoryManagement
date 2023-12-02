const express = require("express");
const router = express.Router();
const pool = require("../queries");

/**
 * @swagger
 * tags:
 *   name: Data Barang
 *   description: API for Data Barang operations
 */

/**
 * @swagger
 * /api/kategori_barang:
 *   get:
 *     summary: Fetch all kategori barang
 *     tags: [Data Barang]
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             example:
 *               status: 200
 *               message: "Hooray: We found some magical kategori barang!"
 *               data: []
 *       500:
 *         description: Internal Server Issue
 *         content:
 *           application/json:
 *             example:
 *               status: 500
 *               message: "Oopsie Daisy: Our server had a little hiccup"
 */
router.get("/kategori_barang", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id_kategori, nama_kategori FROM kategori_barang"
    );
    res.status(200).json({
      status: 200,
      message: "Hooray: We found some magical kategori barang!",
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
/**
 * @swagger
 * /api/data_supplier:
 *   get:
 *     summary: Fetch all data supplier
 *     tags: [Data Barang]
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             example:
 *               status: 200
 *               message: "Hooray: We found some magical data supplier!"
 *               data: []
 *       500:
 *         description: Internal Server Issue
 *         content:
 *           application/json:
 *             example:
 *               status: 500
 *               message: "Oopsie Daisy: Our server had a little hiccup"
 */
router.get("/data_supplier", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id_supplier, nama_supplier FROM data_supplier"
    );
    res.status(200).json({
      status: 200,
      message: "Hooray: We found some magical data supplier!",
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

/**
 * @swagger
 * /api/data_barang/{id_barang}:
 *   get:
 *     summary: Fetch a single data barang by ID
 *     tags: [Data Barang]
 *     parameters:
 *       - in: path
 *         name: id_barang
 *         required: true
 *         description: ID of the data barang
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             example:
 *               status: 200
 *               message: "Success: We found the treasure data barang!"
 *               data: {}
 *       404:
 *         description: Data barang not found
 *         content:
 *           application/json:
 *             example:
 *               status: 404
 *               message: "Oh no: Data barang went on a vacation, nowhere to be found!"
 *       500:
 *         description: Internal Server Issue
 *         content:
 *           application/json:
 *             example:
 *               status: 500
 *               message: "Oopsie Daisy: Our server had a little hiccup"
 */

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

/**
 * @swagger
 * /api/data_barang:
 *   post:
 *     summary: Create a new data barang
 *     tags: [Data Barang]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             id_barang: 456
 *             nama_barang: "Barang Tester"
 *             stok: 50
 *             id_kategori: 1
 *             id_supplier: 1
 *     responses:
 *       201:
 *         description: Success
 *         content:
 *           application/json:
 *             example:
 *               status: 201
 *               message: "Woo-hoo: We successfully spawned a new data barang!"
 *               data: {}
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             example:
 *               status: 400
 *               message: "Oh Snap: Something went haywire with your request!"
 */

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

/**
 * @swagger
 * /api/data_barang/{id_barang}:
 *   put:
 *     summary: Update a data barang by ID
 *     tags: [Data Barang]
 *     parameters:
 *       - in: path
 *         name: id_barang
 *         required: true
 *         description: ID of the data barang
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             nama_barang: "Updated Product"
 *             stok: 60
 *             id_kategori: 2
 *             id_supplier: 2
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             example:
 *               status: 200
 *               message: "Success: We gave our data barang a fancy makeover!"
 *               data: {}
 *       404:
 *         description: Data barang not found
 *         content:
 *           application/json:
 *             example:
 *               status: 404
 *               message: "Oh no: The elusive data barang seems to have slipped away!"
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             example:
 *               status: 400
 *               message: "Oh Snap: Something went haywire with your request!"
 */

router.put("/data_barang/:id_barang", async (req, res) => {
  const { id_barang } = req.params;
  const { nama_barang, stok, id_kategori, id_supplier } = req.body;

  try {
    const result = await pool.query(
      `
      UPDATE data_barang 
      SET nama_barang = $1, stok = $2, id_kategori = $3, id_supplier = $4 
      WHERE id_barang = $5
      RETURNING *
      `,
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

/**
 * @swagger
 * /api/data_barang/{id_barang}:
 *   delete:
 *     summary: Delete a data barang by ID
 *     tags: [Data Barang]
 *     parameters:
 *       - in: path
 *         name: id_barang
 *         required: true
 *         description: ID of the data barang
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             example:
 *               status: 200
 *               message: "Success: We bid farewell to the data barang! 🎉"
 *       404:
 *         description: Data barang not found
 *         content:
 *           application/json:
 *             example:
 *               status: 404
 *               message: "Oh no: The data barang we wanted to delete is playing hide and seek!"
 *       500:
 *         description: Internal Server Issue
 *         content:
 *           application/json:
 *             example:
 *               status: 500
 *               message: "Oopsie Daisy: Our server had a little hiccup"
 */

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
