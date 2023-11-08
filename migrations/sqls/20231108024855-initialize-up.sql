/* Replace with your SQL commands */

Create Table Bantuan (
    id_bantuan serial PRIMARY KEY,
    tanggal date,
    deskripsi varchar(255),
    bukti_pendukung varchar(255),
    status varchar(255)
)