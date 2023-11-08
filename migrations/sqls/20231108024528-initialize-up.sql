/* Replace with your SQL commands */

Create Table Restock_Barang (
    id_restock serial PRIMARY KEY,
    id_barang int,
    tanggal date,
    nama_barang varchar(255),
    jumlah int,
    status varchar(255)
)