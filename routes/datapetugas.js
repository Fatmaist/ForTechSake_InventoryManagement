var express = require("express");
var router = express.Router();
var pool = require("../queries");

//API to get data_petugas
router.get("/datapetugas", (req, res) => {
  pool.query("SELECT * FROM data_petugas ", (err, result) => {
    if (err) {
      console.log(err);
    }
    res.json(result.rows);
  });
});

router.get("/datapetugas/id", (req, res) => {
  pool.query("SELECT * FROM data_petugas ", (err, result) => {
    if (err) {
      console.log(err);
    }
    res.json(result.rows);
  });
});


//API to post data_petugas
router.post("/datapetugas", (req, res) => {
  pool.query(
    "INSERT INTO data_petugas (id_petugas, nama_petugas, no_telepon, username, password) VALUES ($1, $2, $3, $4, $5)",
    [
      req.body.id_petugas,
      req.body.nama_petugas,
      req.body.no_telepon,
      req.body.username,
      req.body.password,
    ],
    (err, result) => {
      if (err) {
        throw err;
      }
      res.send("data petugas added");
    }
  );
});

//API to update data_petugas
router.put("/datapetugas/:id", (req, res) => {
  const { id_petugas, nama_petugas, no_telepon, username, password } = req.body;

  pool.query(
    "UPDATE data_petugas SET id_petugas=$1, nama_petugas=$2, no_telepon=$3, username=$4, password=$5 WHERE id_petugas=$6",
    [id_petugas, nama_petugas, no_telepon, username, password, req.params.id],
    (err, result) => {
      if (err) {
        throw err;
      }
      res.send("data petugas updated");
    }
  );
});

//API to delete data_petugas
router.delete("/datapetugas/:id", (req, res) => {
  pool.query(
    `DELETE FROM data_petugas WHERE id_petugas = ${req.params.id}`,
    (err, result) => {
      if (err) {
        throw err;
      }
      res.send("data petugas deleted");
    }
  );
});

module.exports = router;
