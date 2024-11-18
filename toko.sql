CREATE TABLE users (
    username VARCHAR(20) PRIMARY KEY,
    password VARCHAR(20),
    token VARCHAR(100)
);

CREATE TABLE barang (
    id_barang INT PRIMARY KEY,
    nama_barang VARCHAR(100) NOT NULL,
    harga_beli DECIMAL(10,2) NOT NULL,
    harga_jual DECIMAL(10,2) NOT NULL,
    stok INT NOT NULL
);

CREATE TABLE penjualan (
    id_penjualan VARCHAR(20) PRIMARY KEY,
    id_barang INT NOT NULL,
    jumlah INT NOT NULL,
    tanggal_penjualan DATE NOT NULL,
    total_harga DECIMAL(10,2) NOT NULL
    FOREIGN KEY (id_barang) REFERENCES barang(id_barang)
);


buatkan sebuah api dengan ·    
. Laporan 5 barang terlaris


-- TABLE detail_penjualan (
--     id_detail_penjualan INT PRIMARY KEY,
--     id_penjualan VARCHAR(20) NOT NULL,
--     id_barang INT NOT NULL,
--     jumlah INT NOT NULL,
--     FOREIGN KEY (id_penjualan) REFERENCES penjualan(id_penjualan),
--     FOREIGN KEY (id_barang) REFERENCES barang(id_barang)
-- );


barang
-/barang/add
-/barang/findstok

SELECT
    p.id_barang,
    SUM(jumlah) AS total_penjualan,
    b.nama_barang
FROM
    penjualan p
INNER JOIN barang b ON p.id_barang = b.id_barang
GROUP BY
    id_barang;


SELECT
    b.nama_barang,
    SUM(p.jumlah) AS QTY,
    SUM(p.jumlah * b.harga_jual) AS Total,
    SUM(p.jumlah * b.harga_beli) AS Modal,
    SUM(p.jumlah * (b.harga_jual - b.harga_beli)) AS Keuntungan
FROM
    penjualan p
INNER JOIN barang b ON p.id_barang = b.id_barang
GROUP BY
    b.nama_barang
ORDER BY
    Keuntungan DESC
LIMIT 5;

SELECT
    p.id_penjualan,
    p.tanggal_penjualan,
    b.nama_barang
FROM
    penjualan p
INNER JOIN barang b ON p.id_barang = b.id_barang
WHERE
    b.nama_barang IN (
        SELECT b.nama_barang
        FROM penjualan p
        INNER JOIN barang b ON p.id_barang = b.id_barang
        GROUP BY b.nama_barang
        ORDER BY SUM(p.jumlah * (b.harga_jual - b.harga_beli)) DESC
        LIMIT 5
    )
ORDER BY b.nama_barang, p.tanggal_penjualan;
