/* Replace with your SQL commands */

Create Table Barang_Keluar (
    id_keluar serial PRIMARY KEY,
    id_barang int,
    tanggal date,
    nama_barang varchar(255),
    jumlah int,
    tempat_distributor varchar(255)
)