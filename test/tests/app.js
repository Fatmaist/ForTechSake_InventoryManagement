const app = require('../app')
const request = require('supertest')


// get paginated results
app.get(`/users/paginate`, (req,res) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    //calculating the starting and ending index 
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};
    if (endIndex < module.length) {
        results.next = {
            page: page + 1,
            limit: limit,
        };
    }

    if (startIndex < 0) {
        results.previous = {
            page: page - 1,
            limit: limit,
        };
    }

    results.results = model.slice(startIndex, endIndex);
    res.json(results);
});



describe('Data Barang Keluar API Endpoint', () => {
    let createIdBarangKeluar

    // Test for endpoint GET /api/barang_keluar 
    it('should get data barang keluar', async () => {
        const res = await request(app).get('/api/keluar')
        expect(res.statusCode).toEqual(200)
        expect(Array.isArray(res.body)).toBe(true)
    })

    // Test for endpoint GET /api/barang_keluar/:id_keluar
    it('should get data barang keluar by id', async () => {
        const res = await request(app).get('/api/keluar/1')
        expect(res.statusCode).toEqual(200)
        expect(Array.isArray(res.body)).toBe(true)
    })

    // Test for endpoint POST /api/barang_keluar
    it('should create data restock barang', async () => {
    const res = await request(app).post('/api/keluar').send({
        id_barang: 301,
        tanggal: '2023-09-15',
        nama_barang: 'Samsung Galaxy Flip 5',
        jumlah: 10,
        tempat_distributor: 'Nana Cell Jakarta',
        })
        expect(res.statusCode).toEqual(200)
    })

    //Test for endpoint PUT /api/keluar/{id_keluar}
    it('should update data barang keluar by id_keluar', async () => {
    const dataToUpdate = {
        id_barang: 301,
        tanggal: '2023-09-15',
        nama_barang: 'Samsung Galaxy Flip 5',
        jumlah: 10,
        tempat_distributor: 'Nana Cell Jakarta',
        }
        const res = await request(app).put('/api/keluar/2').send(dataToUpdate)
        expect(res.statusCode).toEqual(200);
    })

    //Test for endpoint DELETE /api/keluar/{id_keluar}
    it('should delete data barang keluar by id_keluar', async () => {
    const res = await request(app).delete('/api/keluar/2')

    expect(res.statusCode).toEqual(200)
    })

})