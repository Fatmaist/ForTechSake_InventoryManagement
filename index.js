var express = require('express')
var app = express()
var pool = require('./queries')
var swaggerJsDoc = require('swagger-jsdoc')
var swaggerUi = require('swagger-ui-express')
var restock_barang = require('./routes/restock_barang')

app.use('', restock_barang)

pool.connect((err, res) => {
    console.log(err)
    console.log('connected')
})

const option = {
    definition: {
        openapi: '3.0.1',
        info: {
            title: 'Express API with Swagger',
            version: '1.0.0',
            description: 'This is a CRUD API for Resctok Barang',
        },
        servers: [
            {
                url: 'http://localhost:3000',
            }
        ]
    },
    apis: ['./routes/*.js'],
}

const specs = swaggerJsDoc(option)
app.use(
    '/api-docs', 
    swaggerUi.serve, 
    swaggerUi.setup(specs, { explorer: true }))

app.listen(3000)