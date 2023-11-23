const app = require("../app");
const request = require("supertest");

describe("Data Barang Masuk API Endpoint", () => {
  let createIdBarangMasuk;

  // Test for endpoint GET /api/barang_masuk
  it("should get data barang masuk", async () => {
    const res = await request(app).get("/api/barangmasuk");
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  // Test for endpoint GET /api/barang_masuk/:id_masuk
  it("should get data barang masuk by id", async () => {
    const res = await request(app).get("/api/barangmasuk/1");
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  // Test for endpoint POST /api/barang_masuk
  it("should create data barang masuk", async () => {
    const res = await request(app).post("/api/barangmasuk").send({
      id_masuk: 2,
      id_barang: 301,
      tanggal: "2023-12-19",
      nama_barang: "Samsung Galaxy Flip 5",
      jumlah: 10,
    });

    expect(res.statusCode).toEqual(200);
  });

  //Test for endpoint PUT /api/barang_masuk/{id_masuk}
  it("should update data barang masuk by id_masuk", async () => {
    const dataToUpdate = {
      id_masuk: 2,
      id_barang: 301,
      tanggal: "2023-12-19",
      nama_barang: "Samsung Galaxy Flip 5",
      jumlah: 10,
    };
    const res = await request(app).put("/api/barangmasuk/2").send(dataToUpdate);
    expect(res.statusCode).toEqual(200);
  });

  //Test for endpoint DELETE /api/barangmasuk/{id_masuk}
  it("should delete data barang masuk by id_masuk", async () => {
    const res = await request(app).delete("/api/barangmasuk/2");

    expect(res.statusCode).toEqual(200);
  });
});
