//API to get all restock_barang
router.get('/restock', (req, res) => {
    pool.query('SELECT * FROM restock_barang', (err, result) => {
        if (err) {
            console.log(err)
        }
        res.json(result.rows)
    })
})

//API to post restock_barang
router.post('/restock', (req, res) => {
    pool.query('INSERT INTO restock_barang (id_barang, tanggal, nama_barang, jumlah, status) VALUES ($1, $2, $3, $4, $5)', [req.body.id_barang, req.body.tanggal, req.body.nama_barang, req.body.jumlah, req.body.status], (err, result) => {
        if (err) {
            console.log(err)
        }
        res.send('restock_barang added')
    })
})

//API to update restock_barang
// router.put('/:id_restock', (req, res) => {
//     pool.query('UPDATE restock_barang SET id_barang=$1, tanggal=$2, nama_barang=$3, jumlah=$4, status=$5 WHERE id_restock=$5', [req.body.id_barang, req.body.id_supplier, req.body.jumlah, req.body.tanggal, req.params.id_resctock], (err, result) => {
//         if (err) {
//             console.log(err)
//         }
//         res.send('restock_barang updated')
//     })
// })

//API to update seluruh atribut restock_barang berdasarkan id_restock
router.put('/restock/:id_restock', (req, res) => {
    const { id_barang, tanggal, nama_barang, jumlah, status } = req.body

    pool.query(
        'UPDATE restock_barang SET id_barang=$1, tanggal=$2, nama_barang=$3, jumlah=$4, status=$5 WHERE id_restock=$6',
        [id_barang, tanggal, nama_barang, jumlah, status, req.params.id_restock],
        (err, result) => {
            if (err) {
                console.log(err)
                res.status(500).send('Gagal')
            } else {
                res.send('restock_barang updated')
            }
        }
    );
});


//API to delete restock_barang
router.delete('/restock/:id_restock', (req, res) => {
    pool.query('DELETE FROM restock_barang WHERE id_restock=$1', [req.params.id_restock], (err, result) => {
        if (err) {
            console.log(err)
        }
        res.send('restock_barang deleted')
    })
})

module.exports = router