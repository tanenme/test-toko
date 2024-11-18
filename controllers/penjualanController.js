import Penjualan from "../models/penjualanModels.js";
import Barang from "../models/barangModels.js";
import { Sequelize} from "sequelize";
import { penjualanSchema } from "../validate/penjualanValidateSchema.js";
import client from "../src/pg.js";

export const inputPenjualan = async (req, res) => {

    const {error} = penjualanSchema.validate(req.body)

    if (error) {
        res.status(400).json({success: false,
            msg: error.details[0].message })
        return;
      }

    const {id_barang, jumlah} = req.body

    try {
        const barang = await Barang.findOne({
            where: {
                id_barang: req.body.id_barang
            }
        })

        if (!barang) {
            return res.status(404).json({success: false,
               message: 'Barang tidak ditemukan' });
        }
        
        if (barang.stok < jumlah) {
            res.status(400).json({success: false,
              message: 'Stok tidak mencukupi' })
            return 
        }

        const totalHarga = jumlah * barang.harga_jual

        await Barang.update(
            { stok: barang.stok - jumlah }, {
                where: {
                    id_barang: req.body.id_barang
                }
           }
        )

        await Penjualan.create({
            id_barang: id_barang,
            jumlah: jumlah,
            total_harga: totalHarga
          })
    
        res.status(201).json({success: true,
          message: "Created" });
      } catch (error) {
        res.status(400).json({
            success: false,
            msg: error
        })
      }
}


export const laporanTerlaris = async (req,res) => {
    try {

      //SELECT "penjualan"."id_barang", sum("jumlah") AS "total_terjual", "barang"."id_barang" AS "barang.id_barang", "barang"."nama_barang" AS "barang.nama_barang" FROM "penjualan" AS "penjualan" LEFT OUTER JOIN "barang" AS "barang" ON "penjualan"."id_barang" = "barang"."id_barang" GROUP BY "id_barang" ORDER BY total_terjual DESC LIMIT 5;

        const result =  await client.query(`
        SELECT 
          p.id_barang, 
          b.nama_barang,
          SUM(p.jumlah) AS total_penjualan
        FROM 
          penjualan p
        INNER JOIN barang b ON p.id_barang = b.id_barang
        GROUP BY 
          p.id_barang, b.nama_barang
        ORDER BY 
          total_penjualan DESC;`);

        res.status(200).json({
          success: true,
          msg: result.rows
        });
      } catch (error) {
        console.log(error)
        res.status(400).json({
            msg: error
        })
      }
}

export const laporanMenguntungkan = async (req,res) => {
  try {

    //SELECT "penjualan"."id_barang", sum("jumlah") AS "total_terjual", "barang"."id_barang" AS "barang.id_barang", "barang"."nama_barang" AS "barang.nama_barang" FROM "penjualan" AS "penjualan" LEFT OUTER JOIN "barang" AS "barang" ON "penjualan"."id_barang" = "barang"."id_barang" GROUP BY "id_barang" ORDER BY total_terjual DESC LIMIT 5;

      const result =  await client.query(`
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
`);

      res.status(200).json({
        success: true,
        msg: result.rows
      });
    } catch (error) {
      console.log(error)
      res.status(400).json({
          msg: error
      })
    }
}

export const laporanPenjualanYangMenguntungkan = async (req,res) => {
  try {

    //SELECT "penjualan"."id_barang", sum("jumlah") AS "total_terjual", "barang"."id_barang" AS "barang.id_barang", "barang"."nama_barang" AS "barang.nama_barang" FROM "penjualan" AS "penjualan" LEFT OUTER JOIN "barang" AS "barang" ON "penjualan"."id_barang" = "barang"."id_barang" GROUP BY "id_barang" ORDER BY total_terjual DESC LIMIT 5;

      const result =  await client.query(`
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
          )
      ORDER BY b.nama_barang, p.tanggal_penjualan
      LIMIT 5;

`);

      res.status(200).json({
        success: true,
        msg: result.rows
      });
    } catch (error) {
      console.log(error)
      res.status(400).json({
          msg: error
      })
    }
}