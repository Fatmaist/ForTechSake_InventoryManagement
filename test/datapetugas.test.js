 const app = require('../app_datapetugas')
 const request = require('supertest')
 

 describe('Data Petugas API Endpoints', () => {
  let createdpetugasId;

  // Test for endpoint GET /api/datapetugas
  it("should get data petugas", async () => {
    const res = await request(app).get("/api/datapetugas");
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  // Test for endpoint GET /api/datapeugas/:id_petugas
  it("should get data petugas by id", async () => {
    const res = await request(app).get("/api/datapetugas/1");
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  // Test for endpoint POST /api/datapetugas
  it("should create data petugas", async () => {
    const res = await request(app).post("/api/datapetugas").send({
      nama_petugas: "sabrina",
      no_telepon: 85784568,
      username: "petugas300",
      password: "petugas300",
    
    });

    expect(res.statusCode).toEqual(200);
  });

  //Test for endpoint PUT /api/datapetugas/{id_petugas}
  it("should update data petugas by id_petugas", async () => {
    const dataToUpdate = {
      nama_petugas: "sabrina",
      no_telepon: 85784568,
      username: "petugas300",
      password: "petugas300",
    };
    const res = await request(app).put("/api/datapetugas/2").send(dataToUpdate);
    expect(res.statusCode).toEqual(200);
  });

  //Test for endpoint DELETE /api/datapetugas/{id_petugas}
  it("should delete data petugas by id_petugas", async () => {
    const res = await request(app).delete("/api/datapetugas/2");

    expect(res.statusCode).toEqual(200);
  });
});


 