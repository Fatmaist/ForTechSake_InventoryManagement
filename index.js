var express = require('express')
var app = express()
var pool = require('./queries')
var restock_barang = require('./routes/restock_barang')

app.use('', restock_barang)

pool.connect((err, res) => {
    console.log(err)
    console.log('connected')
})

app.listen(3000)