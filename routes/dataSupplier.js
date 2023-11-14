const express = require('express');
const router = express.Router();
const pool = require('../queries');

/**
 * @swagger
 * tags:
 *   name: Data Suppliers
 *   description: API for managing data suppliers
 */

/**
 * @swagger
 * /data_suppliers:
 *   get:
 *     summary: Get all data suppliers
 *     tags: [Data Suppliers]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: [{"id_supplier": 1, "nama_supplier": "Supplier A", "no_telepon": 123456789, "alamat": "Address A"}]
 */
router.get('/data_suppliers', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM data_supplier');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

/**
 * @swagger
 * /data_suppliers/{id}:
 *   get:
 *     summary: Get a data supplier by ID
 *     tags: [Data Suppliers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the data supplier
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: {"id_supplier": 1, "nama_supplier": "Supplier A", "no_telepon": 123456789, "alamat": "Address A"}
 */
router.get('/data_suppliers/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM data_supplier WHERE id_supplier = $1', [id]);
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Data supplier not found' });
    } else {
      res.status(200).json(result.rows[0]);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

/**
 * @swagger
 * /data_suppliers:
 *   post:
 *     summary: Create a new data supplier
 *     tags: [Data Suppliers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example: {"id_supplier": 1, "nama_supplier": "Supplier B", "no_telepon": 987654321, "alamat": "Address B"}
 *     responses:
 *       201:
 *         description: Data supplier created successfully
 *         content:
 *           application/json:
 *             example: {"id_supplier": 1, "nama_supplier": "Supplier B", "no_telepon": 987654321, "alamat": "Address B"}
 */
 router.post('/data_suppliers', async (req, res) => {
    const { id_supplier, nama_supplier, no_telepon, alamat } = req.body;
  
    try {
      const result = await pool.query(
        'INSERT INTO data_supplier (id_supplier, nama_supplier, no_telepon, alamat) VALUES ($1, $2, $3, $4) RETURNING *',
        [id_supplier, nama_supplier, no_telepon, alamat]
      );
  
      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

/**
 * @swagger
 * /data_suppliers/{id}:
 *   put:
 *     summary: Update a data supplier by ID
 *     tags: [Data Suppliers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the data supplier
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example: {"nama_supplier": "Updated Supplier B", "no_telepon": 987654321, "alamat": "Updated Address B"}
 *     responses:
 *       200:
 *         description: Data supplier updated successfully
 *         content:
 *           application/json:
 *             example: {"id_supplier": 2, "nama_supplier": "Updated Supplier B", "no_telepon": 987654321, "alamat": "Updated Address B"}
 */
router.put('/data_suppliers/:id', async (req, res) => {
  const { id } = req.params;
  const { nama_supplier, no_telepon, alamat } = req.body;
  try {
    const result = await pool.query(
      'UPDATE data_supplier SET nama_supplier = $1, no_telepon = $2, alamat = $3 WHERE id_supplier = $4 RETURNING *',
      [nama_supplier, no_telepon, alamat, id]
    );
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Data supplier not found' });
    } else {
      res.status(200).json(result.rows[0]);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

/**
 * @swagger
 * /data_suppliers/{id}:
 *   delete:
 *     summary: Delete a data supplier by ID
 *     tags: [Data Suppliers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the data supplier
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Data supplier deleted successfully
 */
router.delete('/data_suppliers/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM data_supplier WHERE id_supplier = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Data supplier not found' });
    } else {
      res.status(204).send();
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
