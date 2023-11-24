-- INSERT INTO admin (nama_admin, username, password) VALUES ('Niki', 'admin1', 'admin123')

-- INSERT INTO data_petugas (nama_petugas, no_telepon, username, password) VALUES ('Fatma', 857123561, 'petugas1', 'petugaske1')
-- INSERT INTO data_petugas (nama_petugas, no_telepon, username, password) VALUES ('Annisa', 851225578, 'petugas2', 'petugaske2'),
-- ('Sinta', 812756434, 'petugas3', 'petugaske3'),
-- ('Wardatul', 813454999, 'petugas4', 'petugaske4'),
-- ('Wawah', 857988122, 'petugas5', 'petugaske5'),
-- ('Nadya', 812667343, 'petugas6', 'petugaske6')

-- INSERT INTO kategori_barang (id_kategori, nama_kategori, deskripsi) values (101, 'Smartphone', 'ini adalah kategori smartphone atau ponsel pintar')

-- INSERT INTO data_supplier (id_supplier, nama_supplier, no_telepon, alamat) values (991, 'PT. Shipment', 812978888, 'Tangerang Raya')

-- INSERT INTO Data_Barang (id_barang, nama_barang, stok, id_kategori, id_supplier) values (301, 'Samsung Galaxy Z Flip 5', 45, 101, 991)

-- INSERT INTO barang_masuk (id_barang, tanggal, nama_barang, jumlah) values (301, '2023-09-01', 'Samsung Galaxy Z Flip 5', 10)

-- INSERT INTO barang_keluar (id_barang, tanggal, nama_barang, jumlah, tempat_distributor) values (301, '2023-09-15', 'Samsung Galaxy Z Flip 5', 5, 'Nana Cell Jakarta')

-- INSERT INTO restock_barang (id_barang, tanggal, nama_barang, jumlah, status) values (301, '2023-09-18', 'Samsung Galaxy Z Flip 5', 5, 'Permintaan Barang')