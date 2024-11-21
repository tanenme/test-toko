import { DataTypes } from "sequelize";
import db from "../src/connection.js";

const Users = db.define('users', {
    username: {
        type: DataTypes.CHAR,
        primaryKey: true,
        allowNull:false
    },
    password: {
        type: DataTypes.CHAR(60),
        allowNull: false,
    }
},{
    timestamps: false,
    freezeTableName: true
})

export default Users

await db.sync()

// const create = await Barang.create({
//     nama_barang: 'laptop',
//     harga_beli: 2000000,
//     harga_jual: 3000000,
//     stok: 50
// })

// const find = await Barang.findAll()
// console.log(find)