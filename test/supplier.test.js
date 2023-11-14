const request = require('supertest');
const app = require('../index');

describe('Data Supplier API Endpoints', () => {
  let createdSupplierId;

  // Test untuk endpoint GET /data_suppliers
  it('should fetch all data suppliers', async () => {
    const res = await request(app).get('/data_suppliers');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  // Test untuk endpoint GET /data_suppliers/:id
  it('should fetch a single data supplier by ID', async () => {
    const res = await request(app).get('/data_suppliers/991');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id_supplier');
  });

  // Test untuk endpoint POST /data_suppliers
  it('should create a new data supplier', async () => {
    const res = await request(app)
      .post('/data_suppliers')
      .send({
        id_supplier: 1, 
        nama_supplier: 'Test Supplier',
        no_telepon: 123456789,
        alamat: 'Test Address',
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id_supplier');
    createdSupplierId = res.body.id_supplier;
  });

  // Test untuk endpoint PUT /data_suppliers/:id
  it('should update a data supplier by ID', async () => {
    const res = await request(app)
      .put(`/data_suppliers/${createdSupplierId}`)
      .send({
        nama_supplier: 'Updated Test Supplier',
        no_telepon: 987654321,
        alamat: 'Updated Test Address',
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id_supplier', createdSupplierId);
    expect(res.body.nama_supplier).toEqual('Updated Test Supplier');
    expect(res.body.no_telepon).toEqual(987654321);
    expect(res.body.alamat).toEqual('Updated Test Address');
  });

  // Test untuk endpoint DELETE /data_suppliers/:id
  it('should delete a data supplier by ID', async () => {
    const res = await request(app).delete(`/data_suppliers/${createdSupplierId}`);
    expect(res.statusCode).toEqual(204);

    // Verifikasi bahwa data supplier telah dihapus
    const deletedSupplier = await request(app).get(`/data_suppliers/${createdSupplierId}`);
    expect(deletedSupplier.statusCode).toEqual(404);
  });
});