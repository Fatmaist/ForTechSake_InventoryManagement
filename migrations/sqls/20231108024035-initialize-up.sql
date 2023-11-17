/* Replace with your SQL commands */

Create Table Barang_Masuk (
    id_masuk serial PRIMARY KEY,
    id_barang int,
    tanggal date,
    nama_barang varchar(255),
    jumlah int
)