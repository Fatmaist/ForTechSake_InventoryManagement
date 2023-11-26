const request = require("supertest");
const app = require("../index");

describe("Data Barang API Endpoints", () => {
  let createdBarangId;

  // Test untuk endpoint GET /data_barang
  it("should fetch all data barang", async () => {
    const res = await request(app).get("/api/data_barang");
    expect(res.statusCode).toEqual(200);
    expect(res.body.status).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  // Test untuk endpoint GET /data_barang/:id_barang
  it("should fetch a single data barang by ID", async () => {
    const res = await request(app).get("/api/data_barang/301");
    expect(res.statusCode).toEqual(200);
    expect(res.body.status).toBe(200);
    expect(res.body.data).toHaveProperty("id_barang");
  });

  // Test untuk endpoint POST /data_barang
  it("should create a new data barang", async () => {
    expect.assertions(3);
    const res = await request(app).post("/api/data_barang").send({
      id_barang: 654,
      nama_barang: "Barang Tester",
      stok: 50,
      id_kategori: 101,
      id_supplier: 991,
    });

    expect(res.statusCode).toEqual(201);
    expect(res.body.status).toBe(201);
    expect(res.body.data).toHaveProperty("id_barang");
    createdBarangId = res.body.data.id_barang;
  });

  // Test untuk endpoint PUT /data_barang/:id_barang
  it("should update a data barang by ID", async () => {
    expect.assertions(7);
    const res = await request(app)
      .put(`/api/data_barang/${createdBarangId}`)
      .send({
        nama_barang: "Barang Tumbal",
        stok: 60,
        id_kategori: 101,
        id_supplier: 991,
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body.status).toBe(200);
    expect(res.body.data).toHaveProperty("id_barang", createdBarangId);
    expect(res.body.data.nama_barang).toEqual("Barang Tumbal");
    expect(res.body.data.stok).toEqual(60);
    expect(res.body.data.id_kategori).toEqual(101);
    expect(res.body.data.id_supplier).toEqual(991);
  });

  // Test untuk endpoint DELETE /data_barang/:id_barang
  it("should delete a data barang by ID", async () => {
    expect.assertions(2);
    const res = await request(app).delete(
      `/api/data_barang/${createdBarangId}`
    );
    expect(res.statusCode).toEqual(200);

    // Verifikasi bahwa data barang telah dihapus
    const deletedBarang = await request(app).get(
      `/api/data_barang/${createdBarangId}`
    );
    expect(deletedBarang.statusCode).toEqual(404);
  });
});
