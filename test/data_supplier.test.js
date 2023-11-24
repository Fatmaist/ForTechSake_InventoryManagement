const request = require('supertest');
const app = require('../index');

describe('Data Supplier API Endpoints', () => {
  let createdSupplierId;

  // Test untuk endpoint GET /data_suppliers
  it('should fetch all data suppliers', async () => {
    const res = await request(app).get('/data_suppliers');
    expect(res.statusCode).toEqual(200);
    expect(res.body.status).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  // Test untuk endpoint GET /data_suppliers/:id
  it('should fetch a single data supplier by ID', async () => {
    const res = await request(app).get('/data_suppliers/991');
    expect(res.statusCode).toEqual(200);
    expect(res.body.status).toBe(200);
    expect(res.body.data).toHaveProperty('id_supplier');
  });

  // Test untuk endpoint POST /data_suppliers
  it('should create a new data supplier', async () => {
    const res = await request(app)
      .post('/data_suppliers')
      .send({
        id_supplier: 997,
        nama_supplier: 'PT. Citra Abadi',
        no_telepon: 853890446,
        alamat: 'Jakarta',
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body.status).toBe(201);
    expect(res.body.data).toHaveProperty('id_supplier');
    createdSupplierId = res.body.data.id_supplier;
  });

  // Test untuk endpoint PUT /data_suppliers/:id
  it('should update a data supplier by ID', async () => {
    const res = await request(app)
      .put(`/data_suppliers/${createdSupplierId}`)
      .send({
        nama_supplier: 'PT. Citra Abadi',
        no_telepon: 853893702,
        alamat: 'Jakarta',
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body.status).toBe(200);
    expect(res.body.data).toHaveProperty('id_supplier', createdSupplierId);
    expect(res.body.data.nama_supplier).toEqual('PT. Citra Abadi');
    expect(res.body.data.no_telepon).toEqual(853893702);
    expect(res.body.data.alamat).toEqual('Jakarta');
  });

  // Test untuk endpoint DELETE /data_suppliers/:id
  it('should delete a data supplier by ID', async () => {
    const res = await request(app).delete(`/data_suppliers/${createdSupplierId}`);
    expect(res.statusCode).toEqual(200);

    // Verifikasi bahwa data supplier telah dihapus
    const deletedSupplier = await request(app).get(`/data_suppliers/${createdSupplierId}`);
    expect(deletedSupplier.statusCode).toEqual(404);
  });
});