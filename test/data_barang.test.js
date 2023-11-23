const request = require("supertest");
const app = require("../index");

describe("Data Barang API Endpoints", () => {
  let createdBarangId;

  // Test untuk endpoint GET /databarang
  it("should fetch all data barang", async () => {
    const res = await request(app).get("/databarang");
    expect(res.statusCode).toEqual(200);
    expect(res.body.status).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  // Test untuk endpoint GET /databarang/:id_barang
  it("should fetch a single data barang by ID", async () => {
    const res = await request(app).get("/databarang/1");
    expect(res.statusCode).toEqual(200);
    expect(res.body.status).toBe(200);
    expect(res.body.data).toHaveProperty("id_barang");
  });

  // Test untuk endpoint POST /databarang
  it("should create a new data barang", async () => {
    const res = await request(app).post("/databarang").send({
      id_barang: 456,
      nama_barang: "Barang Tester",
      stok: 50,
      id_kategori: 1,
      id_supplier: 1,
    });

    expect(res.statusCode).toEqual(201);
    expect(res.body.status).toBe(201);
    expect(res.body.data).toHaveProperty("id_barang");
    createdBarangId = res.body.data.id_barang;
  });

  // Test untuk endpoint PUT /databarang/:id_barang
  it("should update a data barang by ID", async () => {
    const res = await request(app).put(`/databarang/${createdBarangId}`).send({
      nama_barang: "Barang Tumbal",
      stok: 60,
      id_kategori: 2,
      id_supplier: 2,
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body.status).toBe(200);
    expect(res.body.data).toHaveProperty("id_barang", createdBarangId);
    expect(res.body.data.nama_barang).toEqual("Product XYZ");
    expect(res.body.data.stok).toEqual(60);
    expect(res.body.data.id_kategori).toEqual(2);
    expect(res.body.data.id_supplier).toEqual(2);
  });

  // Test untuk endpoint DELETE /databarang/:id_barang
  it("should delete a data barang by ID", async () => {
    const res = await request(app).delete(`/databarang/${createdBarangId}`);
    expect(res.statusCode).toEqual(200);

    // Verifikasi bahwa data barang telah dihapus
    const deletedBarang = await request(app).get(
      `/databarang/${createdBarangId}`
    );
    expect(deletedBarang.statusCode).toEqual(404);
  });
});
