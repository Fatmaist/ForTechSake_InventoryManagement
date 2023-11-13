var express = require('express')
var router = express.Router()
var pool = require('../queries')
var bodyParser = require('body-parser')

router.use(bodyParser.json())


//API to get all restock_barang
router.get('/restock', (req, res) => {
    pool.query('SELECT * FROM restock_barang', (err, result) => {
        if (err) {
            console.log(err)
            res.status(500).send({message: 'Failed to get data!'})
        }
        res.status(200).json(result.rows)
    })
})

//API to get restock_barang by id_restock
router.get('/restock/:id_restock', (req, res) => {
    const { id_restock } = req.params
    pool.query('SELECT * FROM restock_barang WHERE id_restock=$1', [id_restock], (err, result) => {
        if (err) {
            console.log(err)
            res.status(500).send({message: 'Failed to get data by id!'})
        }
        res.status(200).json(result.rows)
    })
})

//API to post restock_barang
router.post('/restock', (req, res) => {
    const { id_barang, tanggal, nama_barang, jumlah, status } = req.body

    pool.query(
        'INSERT INTO restock_barang (id_barang, tanggal, nama_barang, jumlah, status) VALUES ($1, $2, $3, $4, $5)',
        [id_barang, tanggal, nama_barang, jumlah, status],
        (err, result) => {
            if (err) {
                console.log(err)
                res.status(500).send('Failed to insert data restock barang!')
            } else {
                res.status(200).send('restock_barang added')
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
                res.status(500).send('Failed to update data restock barang!')
            } else {
                res.status(200).send('restock_barang updated')
            }
        }
    )
})


//API to delete restock_barang
router.delete('/restock/:id_restock', (req, res) => {
    pool.query('DELETE FROM restock_barang WHERE id_restock=$1', [req.params.id_restock], (err, result) => {
        if (err) {
            console.log(err)
            res.status(500).send('Failed to delete data restock barang!')
        }
        res.status(500).send('restock_barang deleted')
    })
})

module.exports = router