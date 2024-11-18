import { DataTypes } from "sequelize";
import db from "../src/connection.js";

const Barang = db.define('barang', {
    id_barang: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nama_barang: {
        type: DataTypes.CHAR(20),
        allowNull: false,
    },
    harga_beli: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false,
    },
    harga_jual: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false,
    },
    stok: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
},{
    timestamps: false,
    freezeTableName: true
})

export default Barang

await db.sync()

// const create = await Barang.create({
//     nama_barang: 'laptop',
//     harga_beli: 2000000,
//     harga_jual: 3000000,
//     stok: 50
// })

// const find = await Barang.findAll()
// console.log(find)