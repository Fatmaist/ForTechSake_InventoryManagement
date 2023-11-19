const app = require('../app')
const request = require('supertest')

describe('Data Restock Barang API Endpoint', () => {
    let createIdRestock

    // Test for endpoint GET /api/restock_barang  
    it('should get data restock barang', async () => {
        const res = await request(app).get('/api/restock')
        expect(res.statusCode).toEqual(200)
        expect(Array.isArray(res.body)).toBe(true)
    })

    // Test for endpoint GET /api/restock_barang/:id_restock
    it('should get data restock barang by id', async () => {
        const res = await request(app).get('/api/restock/1')
        expect(res.statusCode).toEqual(200)
        expect(Array.isArray(res.body)).toBe(true)
    })

    // Test for endpoint POST /api/restock_barang
    it('should create data restock barang', async () => {
    const res = await request(app).post('/api/restock').send({
        id_barang: 301,
        tanggal: '2023-12-19',
        nama_barang: 'Samsung Galaxy Flip 5',
        jumlah: 10,
        status: 'Permintaan Barang'
        })
        expect(res.statusCode).toEqual(200)
    })

    //Test for endpoint PUT /api/restock/{id_restock}
    it('should update data restock barang by id_restock', async () => {
    const dataToUpdate = {
        id_barang: 301,
        nama_barang: 'Samsung Galaxy Flip 5',
        jumlah: 10,
        status: 'Permintaan Diproses'
        }
        const res = await request(app).put('/api/restock/2').send(dataToUpdate)
        expect(res.statusCode).toEqual(200);
    })

    //Test for endpoint DELETE /api/resctock/{id_restock}
    it('should delete data restock barang by id_restock', async () => {
    const res = await request(app).delete('/api/restock/2')

    expect(res.statusCode).toEqual(200)
    })

})