import { DataTypes } from "sequelize";
import db from "../src/connection.js";
import Barang from "./barangModels.js";
import moment from "moment";

const Penjualan = db.define('penjualan', {
    id_penjualan: {
        type: DataTypes.STRING,
        primaryKey: true,
        defaultValue: () => moment().format('YYYYMMDDHHmm')
      },
    id_barang: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    tanggal_penjualan: {
        type: DataTypes.DATE,
        defaultValue: () => moment().format('YYYYMMDD')
    },
    jumlah: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    total_harga: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false,
    }
},{
    timestamps: false,
    freezeTableName: true
})

Penjualan.belongsTo(Barang, { foreignKey: 'id_barang' })


export default Penjualan

await db.sync()

// const create = await Penjualan.create({
//     id_penjualan: 'AA202404040111',
//     id_barang: ''
//     tanggal_penjualan: '2024-04-04',
//     total_harga: 1000000
// })

// const find = await Penjualan.findAll()
// console.log(find)