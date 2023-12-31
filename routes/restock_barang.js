var express = require('express')
var router = express.Router()
var pool = require('../queries')
var bodyParser = require('body-parser')

router.use(bodyParser.json())

var inventory = [
    pool.query('SELECT * FROM restock_barang', (err, result) => {
        if (err) {
            console.log(err)
        }
        inventory = result.rows
    })
]

/**
 * @swagger
 * components:
 *   schemas:
 *     restock_barang:
 *       type: object
 *       required:
 *         - id_barang
 *         - tanggal
 *         - nama_barang
 *         - jumlah
 *         - status
 *       properties:
 *         id_barang:
 *           type: integer
 *           description: ID dari resctok barang.
 *         tanggal:
 *           type: string
 *           description: Tanggal Permintaan resctok barang.
 *         nama_barang:
 *           type: string
 *           description: Nama barang yang ingin diajukan.
 *         jumlah:
 *           type: integer
 *           description: Jumlah barang yang diminta.
 *         status:
 *           type: string
 *           description: Status permintaan restock barang.
 *       example:
 *          id_barang: 301
 *          tanggal: 2023-10-10
 *          nama_barang: Samsung Galaxy Flip 5
 *          jumlah: 25
 *          status: Permintaan Barang
 * 
 */

/**
 * @swagger
 * /restock/{id_restock}:
 *   get:
 *     summary: Get Data Restock Barang Berdasarkan ID
 *     tags: [restock_barang]
 *     parameters:
 *       - in: path
 *         name: id_restock
 *         required: true
 *         description: ID_Restock dari restock_barang yang ingin dicari
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: The requested Restock Barang by id.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/restock_barang'
 *       '404':
 *         description: Restock Barang not found
 *       '500':
 *         description: Some server error
 */

/**
 * @swagger
 * tags:
 *   name: restock_barang
 *   description: the restock barang managing API
 * /restock:
 *   post:
 *     summary: Create a new restock_barang
 *     tags: [restock_barang]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/restock_barang'
 *     responses:
 *       '200':
 *         description: The created restock barang.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/restock_barang'
 *       '400':
 *         description: Bad Request
 *       '500':
 *         description: Some server error
 */

/**
 * @swagger
 * /restock/{id_restock}:
 *   put:
 *     summary: Update Restock Barang Berdasarkan ID
 *     tags: [restock_barang]
 *     parameters:
 *       - in: path
 *         name: id_restock
 *         required: true
 *         description: id_restock dari restock_barang yang ingin diupdate
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/restock_barang'
 *     responses:
 *       '200':
 *         description: Update restock_barang.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/restock_barang'
 *       '400':
 *         description: Bad Request
 *       '404':
 *         description: id_restock not found
 *       '500':
 *         description: Some server error
 */

/**
 * @swagger
 * /restock/{id_restock}:
 *   delete:
 *     summary: Delete a restock_barang by id
 *     tags: [restock_barang]
 *     parameters:
 *       - in: path
 *         name: id_restock
 *         required: true
 *         description: ID of the movie to get
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: restock barang successfully
 *       '404':
 *         description: restock barang not found
 *       '500':
 *         description: Some server error
 */

//API to get all restock barang
router.get('/restock', (req, res) => {
    pool.query('SELECT * FROM restock_barang', (err, result) => {
        if (err) {
            console.log(err)
            res.status(500).send({status: 500, message: 'Failed to get data by id!'})
        }
        res.status(200).json({ status: 200, message: 'Success: Restock Barang exist', data: result.rows })
    })
})

//API to get restock_barang by id restock
router.get('/restock/:id_restock', (req, res) => {
    const { id_restock } = req.params
    pool.query('SELECT * FROM restock_barang WHERE id_restock=$1', [id_restock], (err, result) => {
        if (err) {
            console.log(err)
            res.status(404).json({ status: 404, message: 'Failed: Data restock not found' })
        }
        res.status(200).json({ status: 200, message: 'Success: Restock Barang exist', data: result.rows })
    })
})


//API to post restock barang
router.post('/restock', (req, res) => {
    const { id_barang, tanggal, nama_barang, jumlah, status } = req.body

    pool.query(
        'INSERT INTO restock_barang (id_barang, tanggal, nama_barang, jumlah, status) VALUES ($1, $2, $3, $4, $5)',
        [id_barang, tanggal, nama_barang, jumlah, status],
        (err, result) => {
            if (err) {
                console.log(err)
                res.status(500).send({ status: 500, message: 'Failed to insert data restock barang!' })
            } else {
                res.status(201).send( { status: 201, message: 'restock barang created' })
            }
        }
    )
})

//API to update all atribut restock_barang by id_restock
router.put('/restock/:id_restock', (req, res) => {
    const { id_barang, tanggal, nama_barang, jumlah, status } = req.body

    pool.query(
        'UPDATE restock_barang SET id_barang=$1, tanggal=$2, nama_barang=$3, jumlah=$4, status=$5 WHERE id_restock=$6',
        [id_barang, tanggal, nama_barang, jumlah, status, req.params.id_restock],
        (err, result) => {
            if (err) {
                console.log(err)
                res.status(400).send({ status: 400, message: 'Failed to update data restock barang!' })
            } else {
                res.status(200).send({ status: 200, message: 'restock barang updated' })
            }
        }
    )
})


//API to delete restock_barang
router.delete('/restock/:id_restock', (req, res) => {
    pool.query('DELETE FROM restock_barang WHERE id_restock=$1', [req.params.id_restock], (err, result) => {
        if (err) {
            console.log(err)
            res.status(500).send({ status: 500, message: 'Failed to delete data restock barang!' })
        }
        res.status(200).send({ status: 200, message: 'restock barang deleted' })
    })
})

module.exports = router