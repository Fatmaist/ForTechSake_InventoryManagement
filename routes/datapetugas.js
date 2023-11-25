var express = require("express");
var router = express.Router();
var pool = require("../queries");
var bodyParser = require('body-parser')

router.use(bodyParser.json())


//API to get all data_petugas
router.get("/datapetugas", (req, res) => {
  pool.query("SELECT * FROM data_petugas", (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send({ message: "Failed to get data!" });
    }
    res.status(200).json(result.rows);
  });
});

//API to get all data_petugas by id_petugas
router.get("/datapetugas/:id", (req, res) => {
  pool.query(
    `SELECT * FROM data_petugas WHERE id_petugas = ${req.params.id}`,
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send({ message: "Failed to get data by id!" });
      }
      res.status(200).json(result.rows);
    }
  );
});

//API to post data_petugas
router.post("/datapetugas", (req, res) => {
  const { nama_petugas, no_telepon, username, password } = req.body;

  pool.query(
    "INSERT INTO data_petugas (nama_petugas, no_telepon,username,password) VALUES ($1, $2, $3, $4)",
    [nama_petugas, no_telepon,username,password],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Failed to insert data petugas!");
      } else {
        res.status(200).send("data petugas added");
      }
    }
  );
});

//API to update all atribut data_petugas by id_petugas
router.put("/datapetugas/:id", (req, res) => {
  const {nama_petugas, no_telepon, username, password  } = req.body;

  pool.query(
    "UPDATE data_petugas SET nama_petugas=$1, no_telepon=$2, username=$3, password=$4 WHERE id_petugas=$5",
    [nama_petugas, no_telepon,username,password, req.params.id],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Failed to update data petugas!");
      } else {
        res.status(200).send("data petugas updated");
      }
    }
  );
});

//API to delete data_petugas
router.delete("/datapetugas/:id", (req, res) => {
  pool.query(
    `DELETE FROM data_petugas WHERE id_petugas= ${req.params.id}`,
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Failed to delete data petugas!");
      }
      res.status(200).send("data petugas deleted");
    }
  );
});


module.exports = router;